import { z } from "zod";

export const requestDataSchema = z.object({
  body: z.string().optional(),
  headers: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
      enabled: z.boolean(),
      id: z.string(),
    })
  ),
  id: z.string(),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  name: z.string(),
  url: z.string(),
  cookies: z.array(z.string()).optional(),
});

export type RequestData = z.infer<typeof requestDataSchema>;

export const cookieSchema = z.object({
  id: z.number(),
  domain: z.string(),
  path: z.string(),
  name: z.string(),
  value: z.string(),
  expiration: z.date().optional(),
  maxAge: z.number().optional(),
  secure: z.boolean(),
  httpOnly: z.boolean(),
  sameSite: z.enum(["Lax", "None", "Strict"]).optional(),
  createdAt: z.date().optional(),
  collectionId: z.string(),
});
