export const isBooleanTrue = (value: string): boolean => value === "true";
export const isBooleanFalse = (value: string): boolean => value === "false";
export const isNull = (value: string): boolean => value === "null";
export const isNumber = (value: string): boolean => !isNaN(Number(value));
export const isWhitespace = (input: string): boolean =>
  input === " " || input === "\n" || input === "\t" || input === "\r";
