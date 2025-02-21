import { RequestHandler } from "express";
import { z } from "zod";
import { GoogleProvider } from "../../utils/auth/GoogleProvider";
import { Auth } from "../../utils/auth/Auth";
import { JWT_EXPIRATION_TIME, prisma } from "../../config/config";
import { JWTManager } from "../../utils/auth/JWTManager";
import { validateSchema } from "../../utils/validateSchema";

const providers = {
  google: new GoogleProvider(),
} as const;

const loginSchema = z.object({
  token: z.string(),
  provider: z.enum(Object.keys(providers) as [keyof typeof providers]),
});

export const login: RequestHandler = async (request, response, next) => {
  try {
    const { token, provider } = validateSchema(loginSchema, request.body);

    const selectedProvider = providers[provider];
    const authProvider = new Auth(selectedProvider);
    const { email, name, profilePicture } = await authProvider.authenticate(
      token
    );

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Create a new account if it hasn't yet
    if (!user) {
      user = await prisma.$transaction(async (prisma) => {
        const newUser = await prisma.user.create({
          data: {
            email,
            profilePicture,
            username: name,
          },
        });
        const newWorkspace = await prisma.workspace.create({
          data: {
            name: "My Workspace",
            explorer: [],
          },
        });
        await prisma.userWorkspace.create({
          data: {
            userId: newUser.id,
            role: "owner",
            workspaceId: newWorkspace.id,
          },
        });
        response.cookie("workspaceId", newWorkspace.id, {
          httpOnly: false,
          // Note: Ideally this should be Infinity but Chrome can only set max cookie expiration date 400 days into the future, so 1 year is fine ig (unless some there's some weird edge cases, not too tho important rn)
          maxAge: 365 * 24 * 60 * 60 * 1000,
        });

        return newUser;
      });
    }

    const jwt = JWTManager.createToken({
      email,
      id: user.id,
      username: user.username,
    });

    response.cookie("jwt", jwt, {
      httpOnly: true,
      secure: true,
      maxAge: JWT_EXPIRATION_TIME,
    });

    response.send({
      message: "Successfuly logged in user",
    });
  } catch (error) {
    next(error);
  }
};
