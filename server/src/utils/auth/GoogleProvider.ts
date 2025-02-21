import axios from "axios";
import { AppError } from "../errors/AppError";
import { STATUS } from "../http/statusCodes";
import { AuthProvider } from "./Auth";
import { z } from "zod";

const googleResponseSchema = z.object({
  sub: z.string(),
  name: z.string(),
  given_name: z.string(),
  picture: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
});

export class GoogleProvider implements AuthProvider {
  BASE_URL = "https://www.googleapis.com/oauth2/v3/userinfo";
  constructor() {}

  async validate(token?: string) {
    if (!token)
      throw new AppError(
        "Google auth token was not found",
        STATUS.UNAUTHORIZED
      );

    const res = await axios.get(`${this.BASE_URL}?access_token=${token}`);
    const parsed = googleResponseSchema.safeParse(res.data);

    if (!parsed.success) {
      throw new AppError("Invalid Google response", STATUS.UNAUTHORIZED);
    }

    return {
      name: parsed.data.name,
      email: parsed.data.email,
      profilePicture: parsed.data.picture,
    };
  }
}
