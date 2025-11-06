import { describe, expect, test } from "bun:test";
import { blue, Color, colored, cyan, green, magenta, red, strike, white, yellow } from "./colors";

describe("Color.rgb", () => {
  test("should generate ANSI RGB color code", () => {
    const code = Color.rgb(255, 0, 0);
    expect(code).toBe("\u001b[38;2;255;0;0m");
  });

  test("should work with different RGB values", () => {
    expect(Color.rgb(0, 255, 0)).toBe("\u001b[38;2;0;255;0m");
    expect(Color.rgb(0, 0, 255)).toBe("\u001b[38;2;0;0;255m");
    expect(Color.rgb(128, 128, 128)).toBe("\u001b[38;2;128;128;128m");
  });
});

describe("Color.hslToRgb", () => {
  test("should convert red HSL to RGB", () => {
    const { r, g, b } = Color.hslToRgb(0, 1, 0.5);
    expect(r).toBe(255);
    expect(g).toBe(0);
    expect(b).toBe(0);
  });

  test("should convert green HSL to RGB", () => {
    const { r, g, b } = Color.hslToRgb(1 / 3, 1, 0.5);
    expect(r).toBe(0);
    expect(g).toBe(255);
    expect(b).toBe(0);
  });

  test("should convert blue HSL to RGB", () => {
    const { r, g, b } = Color.hslToRgb(2 / 3, 1, 0.5);
    expect(r).toBe(0);
    expect(g).toBe(0);
    expect(b).toBe(255);
  });

  test("should handle zero saturation (grayscale)", () => {
    const { r, g, b } = Color.hslToRgb(0, 0, 0.5);
    expect(r).toBe(128);
    expect(g).toBe(128);
    expect(b).toBe(128);
  });

  test("should handle black (lightness = 0)", () => {
    const { r, g, b } = Color.hslToRgb(0, 1, 0);
    expect(r).toBe(0);
    expect(g).toBe(0);
    expect(b).toBe(0);
  });

  test("should handle white (lightness = 1)", () => {
    const { r, g, b } = Color.hslToRgb(0, 1, 1);
    expect(r).toBe(255);
    expect(g).toBe(255);
    expect(b).toBe(255);
  });
});

describe("Color.hsl", () => {
  test("should generate ANSI color code from HSL", () => {
    const code = Color.hsl(0, 1, 0.5);
    expect(code).toBe("\u001b[38;2;255;0;0m");
  });
});

describe("Color.random", () => {
  test("should generate a random color", () => {
    const color = Color.random();
    // biome-ignore lint/suspicious/noControlCharactersInRegex: ANSI escape codes use control characters
    expect(color).toMatch(/^\u001b\[38;2;\d+;\d+;\d+m$/);
  });

  test("should accept custom lightness and saturation", () => {
    const color = Color.random({ lightness: 0.3, saturation: 0.8 });
    // biome-ignore lint/suspicious/noControlCharactersInRegex: ANSI escape codes use control characters
    expect(color).toMatch(/^\u001b\[38;2;\d+;\d+;\d+m$/);
  });

  test("should generate different colors on multiple calls", () => {
    const colors = new Set();
    for (let i = 0; i < 10; i++) {
      colors.add(Color.random());
    }
    // Should have at least some variation
    expect(colors.size).toBeGreaterThan(1);
  });
});

describe("Color.uniform", () => {
  test("should generate n distinct colors", () => {
    const colors = Color.uniform(5);
    expect(colors).toHaveLength(5);
    // All should be valid ANSI codes
    for (const color of colors) {
      // biome-ignore lint/suspicious/noControlCharactersInRegex: ANSI escape codes use control characters
      expect(color).toMatch(/^\u001b\[38;2;\d+;\d+;\d+m$/);
    }
  });

  test("should accept custom lightness and saturation", () => {
    const colors = Color.uniform(3, { lightness: 0.4, saturation: 0.7 });
    expect(colors).toHaveLength(3);
  });

  test("should generate evenly distributed colors", () => {
    const colors = Color.uniform(3);
    // Should all be different
    const uniqueColors = new Set(colors);
    expect(uniqueColors.size).toBe(3);
  });
});

describe("Color constants", () => {
  test("should have predefined color constants", () => {
    expect(Color.Reset).toBe("\u001b[0m");
    expect(Color.Black).toBe("\u001b[30m");
    expect(Color.Red).toBe("\u001b[31m");
    expect(Color.Green).toBe("\u001b[32m");
    expect(Color.Yellow).toBe("\u001b[33m");
    expect(Color.Blue).toBe("\u001b[34m");
    expect(Color.Magenta).toBe("\u001b[35m");
    expect(Color.Cyan).toBe("\u001b[36m");
    expect(Color.White).toBe("\u001b[37m");
  });

  test("should have light color variants", () => {
    expect(Color.LightRed).toBe("\u001b[91m");
    expect(Color.LightGreen).toBe("\u001b[92m");
    expect(Color.LightYellow).toBe("\u001b[93m");
    expect(Color.LightBlue).toBe("\u001b[94m");
    expect(Color.LightMagenta).toBe("\u001b[95m");
    expect(Color.LightCyan).toBe("\u001b[96m");
  });
});

describe("colored", () => {
  test("should wrap text with color codes", () => {
    const result = colored("test", Color.Red);
    expect(result).toBe(`${Color.Red}test${Color.Reset}`);
  });

  test("should use random color when no color provided", () => {
    const result = colored("test");
    // biome-ignore lint/suspicious/noControlCharactersInRegex: ANSI escape codes use control characters
    expect(result).toMatch(/^\u001b\[38;2;\d+;\d+;\d+mtest\u001b\[0m$/);
  });
});

describe("color helper functions", () => {
  test("red should color text red", () => {
    expect(red("test")).toBe(`${Color.Red}test${Color.Reset}`);
  });

  test("green should color text green", () => {
    expect(green("test")).toBe(`${Color.Green}test${Color.Reset}`);
  });

  test("yellow should color text yellow", () => {
    expect(yellow("test")).toBe(`${Color.Yellow}test${Color.Reset}`);
  });

  test("blue should color text blue", () => {
    expect(blue("test")).toBe(`${Color.Blue}test${Color.Reset}`);
  });

  test("magenta should color text magenta", () => {
    expect(magenta("test")).toBe(`${Color.Magenta}test${Color.Reset}`);
  });

  test("cyan should color text cyan", () => {
    expect(cyan("test")).toBe(`${Color.Cyan}test${Color.Reset}`);
  });

  test("white should color text white", () => {
    expect(white("test")).toBe(`${Color.White}test${Color.Reset}`);
  });

  test("strike should apply strike-through", () => {
    expect(strike("test")).toBe(`${Color.Strike}test${Color.Reset}`);
  });
});
