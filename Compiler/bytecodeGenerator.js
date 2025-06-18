import { parseExpression } from "../Compiler/compiler.js";

function bytecodeGenerator(compiledCode) {
  let pointer = 0;
  const bytecodeOutput = [];

  while (pointer < compiledCode.length) {
    if (compiledCode[pointer].type === "assignment") {
      for (let exp of compiledCode[pointer].expression) {
        if (exp.type === "NUMBER" || exp.type === "STRING") {
          bytecodeOutput.push({ op: "PUSH", value: exp.value });
        } else if (exp.type === "IDENTIFIER") {
          bytecodeOutput.push({ op: "LOAD", name: exp.value });
        } else if (exp.type === "OPERATOR") {
          switch (exp.value) {
            case "+":
              bytecodeOutput.push({ op: "ADD" });
              break;
            case "-":
              bytecodeOutput.push({ op: "SUBTRACT" });
              break;
            case "*":
              bytecodeOutput.push({ op: "MUL" });
              break;
            case "/":
              bytecodeOutput.push({ op: "DIV" });
              break;
            case "^":
              bytecodeOutput.push({ op: "POW" });
              break;
            case "<":
              bytecodeOutput.push({op: "LESSTHAN"});
              break;
            case ">":
              bytecodeOutput.push({op: "GREATERTHAN"});
              break;
            case "==":
              bytecodeOutput.push({op: "EQUALS"});
              break;
            case "<=":
              bytecodeOutput.push({op: "LESSTHANEQUALS"});
              break;
            case ">=":
              bytecodeOutput.push({op: "GREATERTHANEQUALS"});
              break;
            case "!=":
              bytecodeOutput.push({op: "NOTEQUALS"});
              break;
          }
        }
      }
      bytecodeOutput.push({
        op: "STORE",
        name: compiledCode[pointer].variableName,
      });
    } else if (compiledCode[pointer].type === "functionCall") {
  const args = parseExpression(compiledCode[pointer].arguments);
  for (let token of args) {
    if (token.type === "IDENTIFIER") {
      bytecodeOutput.push({ op: "LOAD", name: token.value });
    } else if (token.type === "NUMBER" || token.type === "STRING") {
      bytecodeOutput.push({ op: "PUSH", value: token.value });
    } else if (token.type === "OPERATOR") {
      switch (token.value) {
        case "+":
          bytecodeOutput.push({ op: "ADD" });
          break;
        case "-":
          bytecodeOutput.push({ op: "SUBTRACT" });
          break;
        case "*":
          bytecodeOutput.push({ op: "MUL" });
          break;
        case "/":
          bytecodeOutput.push({ op: "DIV" });
          break;
        case "^":
          bytecodeOutput.push({ op: "POW" });
          break;
        case "<":
          bytecodeOutput.push({ op: "LESSTHAN" });
          break;
        case ">":
          bytecodeOutput.push({ op: "GREATERTHAN" });
          break;
        case "==":
          bytecodeOutput.push({ op: "EQUALS" });
          break;
        case "<=":
          bytecodeOutput.push({ op: "LESSTHANEQUALS" });
          break;
        case ">=":
          bytecodeOutput.push({ op: "GREATERTHANEQUALS" });
          break;
        case "!=":
          bytecodeOutput.push({ op: "NOTEQUALS" });
          break;
      }
    }
  }
  bytecodeOutput.push({ op: "PRINT" });
}
    pointer++;
  }

  return bytecodeOutput;
}

export default bytecodeGenerator;
