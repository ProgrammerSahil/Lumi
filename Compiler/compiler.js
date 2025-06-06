const KEYWORDS = new Set(["set", "consolePrint"]);
const OPERATORS = new Set(["=", "+", "-", "*", "/", "^", "<"]);
const PUNCTUATION = new Set(["(", ")"]);

function parseExpression(tokens) {
  const output = [];
  const operationStack = [];
  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 3,
    "<": 4,
    ">": 4,
    "==": 4,
    "<=": 4,
    ">=": 4,
    "!=": 4,
  };

  for (let token of tokens) {
    if (
      token.type === "NUMBER" ||
      token.type === "IDENTIFIER" ||
      token.type === "STRING"
    ) {
      output.push(token);
    } else if (token.type === "PUNCTUATION" && token.value === "(") {
      operationStack.push(token);
    } else if (token.type === "PUNCTUATION" && token.value === ")") {
      while (
        operationStack.length > 0 &&
        operationStack[operationStack.length - 1].value !== "("
      ) {
        output.push(operationStack.pop());
      }
      operationStack.pop();
    } else if (token.type === "OPERATOR") {
      while (
        operationStack.length > 0 &&
        operationStack[operationStack.length - 1].type === "OPERATOR" &&
        precedence[operationStack[operationStack.length - 1].value] >=
          precedence[token.value]
      ) {
        output.push(operationStack.pop());
      }
      operationStack.push(token);
    }
  }

  while (operationStack.length > 0) {
    output.push(operationStack.pop());
  }

  return output;
}

function lynxCompiler(tokenList) {
  const program = [];
  let currentStack = [];

  for (let i = 0; i < tokenList.length; i++) {
    if (tokenList[i].type === "KEYWORD") {
      if (currentStack.length > 0) {
        program.push([...currentStack]);
        currentStack = [];
      }
    }
    currentStack.push(tokenList[i]);
  }

  if (currentStack.length > 0) {
    program.push([...currentStack]);
  }

  for (let i = 0; i < program.length; i++) {
    switch (program[i][0].value) {
      case "set":
        program[i] = {
          type: "assignment",
          variableName: program[i][1].value,
          expression: parseExpression(program[i].slice(3)),
        };
        break;
      case "consolePrint":
        program[i] = {
          type: "functionCall",
          functionName: program[i][0].value,
          arguments: program[i].slice(2, -1),
        };
    }
  }

  return program;
}

export default lynxCompiler;
