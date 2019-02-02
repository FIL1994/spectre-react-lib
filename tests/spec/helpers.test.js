import { addClass, onEnter } from "../../src/helpers";

describe("helpers", () => {
  describe("addClass", () => {
    test("works well", () => {
      const expected = "test class";

      const result = addClass("test", "class");

      expect(result).toBe(expected);
    });

    test("doesn't append number", () => {
      const expected = "test";

      const result = addClass("test", 27);

      expect(result).toBe(expected);
    });
  });

  describe("onEnter", () => {
    test("works well", () => {
      const callback = jest.fn();

      const result = onEnter(callback);
      result({ key: "Enter" });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test("callback isn't called on non-Enter key", () => {
      const callback = jest.fn();

      const result = onEnter(callback);
      result({ key: "Tab" });
      result({ key: "Left" });

      expect(callback).not.toHaveBeenCalled();
    });
  });
});
