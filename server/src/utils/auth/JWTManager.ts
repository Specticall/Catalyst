import jwt from "jsonwebtoken";
import { z } from "zod";
import { JWT_KEY } from "../../config/env";

const jwtPayloadSchema = z.object({
  email: z.string(),
  id: z.number(),
  username: z.string(),
});

export type JWTPayload = z.infer<typeof jwtPayloadSchema>;

export class JWTManager {
  static createToken(payload: JWTPayload) {
    return jwt.sign(payload, JWT_KEY);
  }

  static verify(token: string) {
    const rawPayload = jwt.verify(token, JWT_KEY);
    return jwtPayloadSchema.parse(rawPayload);
  }
}
