import { InvalidPathParamError } from "@/errors";
import { num, str } from "./asserts";

describe("src/lib/next/asserts.test.ts", () => {
  describe("str", () => {
    test("文字列配列は例外を投げる", () => {
      expect(() => str([""])).toThrow(new InvalidPathParamError());
    });
    test("undefindedは例外を投げる", () => {
      expect(() => str(undefined)).toThrow(new InvalidPathParamError());
    });
  });
  describe("num", () => {
    test("文字列配列は例外を投げる", () => {
      expect(() => num([""])).toThrow(new InvalidPathParamError());
    });
    test("undefindedは例外を投げる", () => {
      expect(() => num(undefined)).toThrow(new InvalidPathParamError());
    });
    test("整数評価できない文字列（非数）は例外を投げる", () => {
      expect(() => num("abc")).toThrow(new InvalidPathParamError());
    });
    test("整数評価できない文字列（不動小数点）は例外を投げる", () => {
      expect(() => num("1.123")).toThrow(new InvalidPathParamError());
    });
    test("整数評価できない文字列（負数）は例外を投げる", () => {
      expect(() => num("-999")).toThrow(new InvalidPathParamError());
    });
  });
});
