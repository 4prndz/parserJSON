import { ASTNode, Token } from "../Types";

export class Parser {
  private tokens: Token[];
  private currentIndex: number;
  private token: Token;

  constructor(tokens: Token[]) {
    if (!tokens.length) {
      throw new Error("Nothing to parse. Exiting!");
    }
    this.tokens = tokens;
    this.currentIndex = 0;
    this.token = tokens[0];
  }

  public static new(tokens: Token[]): ASTNode {
    const parser = new Parser(tokens);
    return parser.parseValue();
  }

  private nextToken() {
    this.currentIndex += 1;
    this.token = this.tokens[this.currentIndex];
  }

  private parseValue(): ASTNode {
    switch (this.token.type) {
      case "String":
        return { type: "String", value: this.token.value };
      case "Number":
        return { type: "Number", value: Number(this.token.value) };
      case "True":
        return { type: "Boolean", value: true };
      case "False":
        return { type: "Boolean", value: false };
      case "Null":
        return { type: "Null", value: null };
      case "LBrace":
        return this.parseObject();
      case "LBracket":
        return this.parseArray();
      default:
        throw new Error(`Unexpected token type: ${this.token.type}`);
    }
  }

  private parseObject() {
    const node: ASTNode = { type: "Object", value: {} };
    this.nextToken();

    while (this.token.type !== "RBrace") {
      if (this.token.type === "String") {
        const key = this.token.value;
        this.nextToken();
        // @ts-ignore
        if (this.token.type !== "Colon")
          throw new Error("Expected : in key-value pair");
        this.nextToken();
        const value = this.parseValue();
        node.value[key] = value;
      } else {
        throw new Error(
          `Expected String key in object. Token type: ${this.token.type}`,
        );
      }
      this.nextToken();
      if (this.token.type === "Comma") this.nextToken();
    }

    return node;
  }

  private parseArray() {
    const node: ASTNode = { type: "Array", value: [] };
    this.nextToken();

    while (this.token.type !== "RBracket") {
      const value = this.parseValue();
      node.value.push(value);

      this.nextToken();
      if (this.token.type === "Comma") this.nextToken();
    }

    return node;
  }
}
