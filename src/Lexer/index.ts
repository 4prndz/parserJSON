import { Token } from "../Types";
import {
  isNumber,
  isNull,
  isWhitespace,
  isBooleanFalse,
  isBooleanTrue,
} from "../Utils/";

export class Lexer {
  private input: string;
  private currentChar: string;
  private currentIndex: number;
  tokens: Token[];

  constructor(input: string) {
    this.input = input;
    this.currentChar = input[0];
    this.currentIndex = 0;
    this.tokens = [];
  }

  public static new(input: string): Token[] {
    const lexer = new Lexer(input);

    while (lexer.currentIndex < lexer.input.length) {
      const token = lexer.parseInputToken();
      if (token.type !== "Whitespace") {
        lexer.tokens.push(token);
      }
      lexer.nextChar();
    }

    return lexer.tokens;
  }

  private nextChar() {
    this.currentIndex += 1;
    this.currentChar = this.input[this.currentIndex];
  }

  private parseInputToken(): Token {
    if (this.currentChar === "{") {
      return { type: "LBrace", value: this.currentChar };
    }
    if (this.currentChar === "}") {
      return { type: "RBrace", value: this.currentChar };
    }
    if (this.currentChar === "[") {
      return { type: "LBracket", value: this.currentChar };
    }
    if (this.currentChar === "]") {
      return { type: "RBracket", value: this.currentChar };
    }
    if (this.currentChar === ":") {
      return { type: "Colon", value: this.currentChar };
    }
    if (this.currentChar === ",") {
      return { type: "Comma", value: this.currentChar };
    }
    if (this.currentChar === '"') {
      let value = "";
      this.nextChar();
      while (this.currentChar !== '"') {
        value += this.currentChar;
        this.nextChar();
      }
      return { type: "String", value };
    }

    if (isWhitespace(this.currentChar)) {
      return { type: "Whitespace", value: "" };
    }

    if (/[\d\w]/.test(this.currentChar)) {
      let value = "";
      while (/[\d\w]/.test(this.currentChar)) {
        value += this.currentChar;
        this.nextChar();
      }

      if (isNumber(value)) return { type: "Number", value };
      else if (isBooleanTrue(value)) return { type: "True", value };
      else if (isBooleanFalse(value)) return { type: "False", value };
      else if (isNull(value)) return { type: "Null", value };
      else throw new Error("Unexpected value: " + value);
    }

    throw new Error("Unexpected char: " + this.currentChar);
  }
}
