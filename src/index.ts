import { Parser } from "./Parser";

import { Lexer } from "./Lexer";

const tokenized = Lexer.new(`{
          "Id": "647ceaf3657eade56f8224eb",
          "Index": 1337,
          "Array": [],
          "Boolean": true,
          "NullValue": null
}`);

console.log(Parser.new(tokenized).value);

//@ts-ignore
console.log(Parser.new(tokenized).value["Array"]);
