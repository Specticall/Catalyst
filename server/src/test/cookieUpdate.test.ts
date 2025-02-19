import { CookieManager } from "../utils/http/CookieManager";

describe("CookieManager", () => {
  describe("updateCookies", () => {
    test("should update cookies with new values", () => {
      const oldCookies = ["jwt=1234; HttpOnly", "abc=2323;"];
      const newCookies = ["jwt=9999; zyx=123123"];
      const result = CookieManager.updateCookies(oldCookies, newCookies);
      expect(result).toEqual(["jwt=9999; zyx=123123", "abc=2323;"]);
    });

    test("should add new cookies if not present in old cookies", () => {
      const oldCookies = ["jwt=1234; HttpOnly"];
      const newCookies = ["abc=2323;"];
      const result = CookieManager.updateCookies(oldCookies, newCookies);
      expect(result).toEqual(["abc=2323;", "jwt=1234; HttpOnly"]);
    });

    test("should remove old cookies if replaced by new cookies", () => {
      const oldCookies = ["jwt=1234; HttpOnly", "abc=2323;"];
      const newCookies = ["jwt=9999;"];
      const result = CookieManager.updateCookies(oldCookies, newCookies);
      expect(result).toEqual(["jwt=9999;", "abc=2323;"]);
    });

    test("should handle empty old cookies", () => {
      const oldCookies: string[] = [];
      const newCookies = ["jwt=9999;"];
      const result = CookieManager.updateCookies(oldCookies, newCookies);
      expect(result).toEqual(["jwt=9999;"]);
    });

    test("should handle empty new cookies", () => {
      const oldCookies = ["jwt=1234; HttpOnly"];
      const newCookies: string[] = [];
      const result = CookieManager.updateCookies(oldCookies, newCookies);
      expect(result).toEqual(["jwt=1234; HttpOnly"]);
    });

    test("should handle both empty old and new cookies", () => {
      const oldCookies: string[] = [];
      const newCookies: string[] = [];
      const result = CookieManager.updateCookies(oldCookies, newCookies);
      expect(result).toEqual([]);
    });

    test("should handle cookies with special characters", () => {
      const oldCookies = ['data="hello, world; keep=me"; Path=/'];
      const newCookies = ['data="new value"; Path=/'];
      const result = CookieManager.updateCookies(oldCookies, newCookies);
      expect(result).toEqual(['data="new value"; Path=/']);
    });

    test("should handle cookies with quoted values", () => {
      const oldCookies = ['user="John Doe=Admin"; Path=/; Secure'];
      const newCookies = ['user="Jane Doe=User"; Path=/; Secure'];
      const result = CookieManager.updateCookies(oldCookies, newCookies);
      expect(result).toEqual(['user="Jane Doe=User"; Path=/; Secure']);
    });
  });
});
