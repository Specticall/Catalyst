import { raw } from "@prisma/client/runtime/library";
import { isNumeric } from "../lib";
import { CollectionCookie, SameSite } from "@prisma/client";

export type ParsedCookie = Record<string, string | boolean>;
export type TranslatedCookie = ReturnType<
  typeof CookieManager.translateCookies
>[number];

export class CookieManager {
  private static getNameValuePair(cookie: string) {
    const tokens = cookie.split(";");
    const nameValuePair = tokens[0].split("=");
    const result = { name: "", value: "" };
    if (nameValuePair) {
      // Handles if "=" is a value character
      const [name, ...valueParts] = nameValuePair.map((item) => item.trim());
      result.name = name.trim();
      result.value = valueParts.join("=").trim();
    }

    return result;
  }

  static parseCookies(cookies?: string[]) {
    if (!cookies) return [];
    return cookies.reduce((res: ParsedCookie[], cookie) => {
      const tokens = cookie.split(";");
      const data: ParsedCookie = {};

      // First element is always name=value
      const { name, value } = this.getNameValuePair(cookie);
      data.name = name;
      data.value = value;

      tokens.forEach((token, i) => {
        const [key, ...valueParts] = token.split("=");
        const value =
          valueParts.length === 0 ? undefined : valueParts.join("=");
        data[key.trim()] = value !== undefined ? value : (true as boolean);
      });

      res.push(data);
      return res;
    }, []);
  }

  static translateCookies(parsedCookies: ParsedCookie[], originDomain: string) {
    return parsedCookies.map((cookie) => {
      const expiration = cookie.Expires
        ? new Date(String(cookie.Expires))
        : undefined;
      return {
        domain: originDomain,
        path: String(cookie.Path) || "",
        name: String(cookie.name),
        value: String(cookie.value),
        expiration: expiration || null,
        secure: Boolean(cookie.Secure),
        httpOnly: Boolean(cookie.HttpOnly),
        sameSite: (cookie.SameSite || null) as SameSite | null,
        maxAge:
          cookie["Max-Age"] && isNumeric(cookie["Max-Age"])
            ? Number(cookie["Max-Age"])
            : null,
      };
    });
  }

  static serializeCookies(cookies: ReturnType<typeof this.translateCookies>) {
    return cookies.map((cookie) => {
      const nameValue = `${cookie.name}=${cookie.value}`;
      const maxAge = cookie.maxAge !== null ? `Max-Age=${cookie.maxAge}` : "";
      const path = cookie.path ? `Path=${cookie.path}` : "";
      const expires = cookie.expiration ? `Expires=${cookie.expiration}` : "";
      const secure = cookie.secure ? `Secure` : "";
      const httpOnly = cookie.httpOnly ? `HttpOnly` : "";
      const sameSite = cookie.sameSite ? `SameSite=${cookie.sameSite}` : "";
      return [nameValue, maxAge, path, expires, secure, httpOnly, sameSite]
        .filter((token) => token)
        .join("; ");
    });
  }

  static updateCookies(oldCookies: string[], newCookies: string[]) {
    const newCookieNames = new Set(
      newCookies.map((cur) => this.getNameValuePair(cur).name)
    );
    const filteredOldCookies = oldCookies.filter((cur) => {
      const { name } = this.getNameValuePair(cur);
      return !newCookieNames.has(name);
    });

    return [...newCookies, ...filteredOldCookies];
  }
}
// console.log(
//   CookieManager.updateCookies(
//     ["jwt=1234;HttpOnly", "abc=2323;"],
//     ["jwt=9999;zyx=123123"]
//   )
// );

// const rawCookie =
//   'jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwaUBnbWFpbC5jb20iLCJpZCI6IjY3YjQxZjEwZTUyMmM3MTcxMmEzNWY0NyIsImlhdCI6MTczOTg1NzY4MH0.YKEWUwawJ1D6ljuoOk26_M2iay4vV8jwZ-AgLZEp0nI"; Max-Age=900; Path=/; Expires=Tue, 18 Feb 2025 06:03:00 GMT; HttpOnly';
// const rawCookie = "InvalidCookieWithoutEquals; Path=/";
// const parsedCookies = CookieManager.parseCookies([rawCookie]);

// const deserializedCookies = CookieManager.translateCookies(
//   parsedCookies,
//   "test.com"
// );
// const test = CookieManager.serializeCookies(deserializedCookies)[0];

// console.log({ test, rawCookie, deserializedCookies }, test === rawCookie);
