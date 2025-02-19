import { CookieManager } from "../utils/http/CookieManager";

describe("CookieManager", () => {
  const testCases = [
    {
      description: "Standard Cookie Format",
      cookies: ["sessionId=abc123; Path=/; Max-Age=3600; Secure; HttpOnly"],
      domain: "example.com",
      expected: [
        {
          domain: "example.com",
          path: "/",
          name: "sessionId",
          value: "abc123",
          expiration: "",
          secure: true,
          httpOnly: true,
          sameSite: null,
          maxAge: 3600,
        },
      ],
    },
    {
      description: "Cookie Without Spaces",
      cookies: ["token=xyz789;Path=/api;Max-Age=1800;Secure;HttpOnly"],
      domain: "api.example.com",
      expected: [
        {
          domain: "api.example.com",
          path: "/api",
          name: "token",
          value: "xyz789",
          expiration: "",
          secure: true,
          httpOnly: true,
          sameSite: null,
          maxAge: 1800,
        },
      ],
    },
    // {
    //   description: "Cookie with Quoted Value",
    //   cookies: ['user="John Doe=Admin"; Path=/; Secure'],
    //   domain: "secure.example.com",
    //   expected: [
    //     {
    //       domain: "secure.example.com",
    //       path: "/",
    //       name: "user",
    //       value: "John Doe=Admin",
    //       expiration: "",
    //       secure: true,
    //       httpOnly: false,
    //       sameSite: null,
    //       maxAge: null,
    //     },
    //   ],
    // },
    {
      description: "Cookie with Expires but No Max-Age",
      cookies: [
        "cartId=456xyz; Expires=Wed, 01 Mar 2025 12:00:00 GMT; Path=/cart",
      ],
      domain: "store.example.com",
      expected: [
        {
          domain: "store.example.com",
          path: "/cart",
          name: "cartId",
          value: "456xyz",
          expiration: "Wed, 01 Mar 2025 12:00:00 GMT",
          secure: false,
          httpOnly: false,
          sameSite: null,
          maxAge: null,
        },
      ],
    },
    {
      description: "Cookie with Only Name-Value Pair",
      cookies: ["simpleCookie=simpleValue"],
      domain: "basic.example.com",
      expected: [
        {
          domain: "basic.example.com",
          path: "",
          name: "simpleCookie",
          value: "simpleValue",
          expiration: "",
          secure: false,
          httpOnly: false,
          sameSite: null,
          maxAge: null,
        },
      ],
    },
    {
      description: "Boolean Attributes Handling (Secure, HttpOnly)",
      cookies: ["authToken=secureData; Secure; HttpOnly"],
      domain: "auth.example.com",
      expected: [
        {
          domain: "auth.example.com",
          path: "",
          name: "authToken",
          value: "secureData",
          expiration: "",
          secure: true,
          httpOnly: true,
          sameSite: null,
          maxAge: null,
        },
      ],
    },
    {
      description: "Max-Age=0 (Instant Expiration)",
      cookies: ["tempCookie=deleted; Max-Age=0"],
      domain: "delete.example.com",
      expected: [
        {
          domain: "delete.example.com",
          path: "",
          name: "tempCookie",
          value: "deleted",
          expiration: "",
          secure: false,
          httpOnly: false,
          sameSite: null,
          maxAge: 0,
        },
      ],
    },
    {
      description: "Multiple Cookies in One Header",
      cookies: [
        "cookie1=value1; Path=/; Secure",
        "cookie2=value2; HttpOnly; Max-Age=500",
      ],
      domain: "multi.example.com",
      expected: [
        {
          domain: "multi.example.com",
          path: "/",
          name: "cookie1",
          value: "value1",
          expiration: "",
          secure: true,
          httpOnly: false,
          sameSite: null,
          maxAge: null,
        },
        {
          domain: "multi.example.com",
          path: "",
          name: "cookie2",
          value: "value2",
          expiration: "",
          secure: false,
          httpOnly: true,
          sameSite: null,
          maxAge: 500,
        },
      ],
    },
    // {
    //   description: "Special Characters in Cookie Value",
    //   cookies: ['data="hello, world; keep=me"; Path=/'],
    //   domain: "special.example.com",
    //   expected: [
    //     {
    //       domain: "special.example.com",
    //       path: "/",
    //       name: "data",
    //       value: "hello, world; keep=me",
    //       expiration: "",
    //       secure: false,
    //       httpOnly: false,
    //       sameSite: null,
    //       maxAge: null,
    //     },
    //   ],
    // },
    {
      description: "SameSite Attribute Handling",
      cookies: ["sensitiveSession=abc123; Secure; HttpOnly; SameSite=Strict"],
      domain: "samesite.example.com",
      expected: [
        {
          domain: "samesite.example.com",
          path: "",
          name: "sensitiveSession",
          value: "abc123",
          expiration: "",
          secure: true,
          httpOnly: true,
          sameSite: "Strict",
          maxAge: null,
        },
      ],
    },
    {
      description: "Invalid Cookie Without =",
      cookies: ["InvalidCookieWithoutEquals; Path=/"],
      domain: "invalid.example.com",
      expected: [],
    },
    {
      description: "Cookie with Extra ; Separators",
      cookies: ["extraSemi=value;; Path=/;; Secure;; HttpOnly"],
      domain: "semicolon.example.com",
      expected: [
        {
          domain: "semicolon.example.com",
          path: "/",
          name: "extraSemi",
          value: "value",
          expiration: "",
          secure: true,
          httpOnly: true,
          sameSite: null,
          maxAge: null,
        },
      ],
    },
    {
      description: "Max-Age as Non-Numeric String",
      cookies: ["invalidMaxAge=cookieValue; Max-Age=notANumber"],
      domain: "invalidmaxage.example.com",
      expected: [
        {
          domain: "invalidmaxage.example.com",
          path: "",
          name: "invalidMaxAge",
          value: "cookieValue",
          expiration: "",
          secure: false,
          httpOnly: false,
          sameSite: null,
          maxAge: null,
        },
      ],
    },
    {
      description: "Expires with Invalid Date Format",
      cookies: ["badExpires=value; Expires=NotARealDate"],
      domain: "badexpires.example.com",
      expected: [
        {
          domain: "badexpires.example.com",
          path: "",
          name: "badExpires",
          value: "value",
          expiration: "NotARealDate",
          secure: false,
          httpOnly: false,
          sameSite: null,
          maxAge: null,
        },
      ],
    },
    {
      description: "Max-Age Overriding Expires",
      cookies: [
        "overrideExample=token123; Max-Age=1000; Expires=Wed, 01 Mar 2025 12:00:00 GMT",
      ],
      domain: "override.example.com",
      expected: [
        {
          domain: "override.example.com",
          path: "",
          name: "overrideExample",
          value: "token123",
          expiration: "Wed, 01 Mar 2025 12:00:00 GMT",
          secure: false,
          httpOnly: false,
          sameSite: null,
          maxAge: 1000,
        },
      ],
    },
    {
      description: "Path Missing Leading Slash",
      cookies: ["noSlash=value; Path=dashboard"],
      domain: "pathfix.example.com",
      expected: [
        {
          domain: "pathfix.example.com",
          path: "dashboard",
          name: "noSlash",
          value: "value",
          expiration: "",
          secure: false,
          httpOnly: false,
          sameSite: null,
          maxAge: null,
        },
      ],
    },
    {
      description: "Empty Cookie Value",
      cookies: ["emptyCookie=; Path=/"],
      domain: "empty.example.com",
      expected: [
        {
          domain: "empty.example.com",
          path: "/",
          name: "emptyCookie",
          value: "",
          expiration: "",
          secure: false,
          httpOnly: false,
          sameSite: null,
          maxAge: null,
        },
      ],
    },
  ];

  testCases.forEach(({ description, cookies, domain, expected }) => {
    test(description, () => {
      const parsedCookies = CookieManager.parseCookies(cookies);
      const deserializedCookies = CookieManager.translateCookies(
        parsedCookies,
        domain
      );
      expect(deserializedCookies).toEqual(expected);
    });
  });
});
