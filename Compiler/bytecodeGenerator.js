import { parseExpression } from "../Compiler/compiler.js";


function generateBytecodeFromExpression(expression) {
  const bytecode = [];

  for (let token of expression) {
    if (token.type === "NUMBER" || token.type === "STRING") {
      bytecode.push({ op: "PUSH", value: token.value });
    } else if (token.type === "IDENTIFIER") {
      bytecode.push({ op: "LOAD", name: token.value });
    } else if (token.type === "OPERATOR") {
      switch (token.value) {
        case "+":
          bytecode.push({ op: "ADD" });
          break;
        case "-":
          bytecode.push({ op: "SUBTRACT" });
          break;
        case "*":
          bytecode.push({ op: "MUL" });
          break;
        case "/":
          bytecode.push({ op: "DIV" });
          break;
        case "^":
          bytecode.push({ op: "POW" });
          break;
        case "<":
          bytecode.push({ op: "LESSTHAN" });
          break;
        case ">":
          bytecode.push({ op: "GREATERTHAN" });
          break;
        case "==":
          bytecode.push({ op: "EQUALS" });
          break;
        case "<=":
          bytecode.push({ op: "LESSTHANEQUALS" });
          break;
        case ">=":
          bytecode.push({ op: "GREATERTHANEQUALS" });
          break;
        case "!=":
          bytecode.push({ op: "NOTEQUALS" });
          break;
        default:
          throw new Error("Unsupported operator: " + token.value);
      }
    }
  }

  return bytecode;
}

function bytecodeGenerator(compiledCode) {
  let pointer = 0;
  const bytecodeOutput = [];

  while (pointer < compiledCode.length) {
    const node = compiledCode[pointer];

    if (node.type === "assignment") {
      const expressionBytecode = generateBytecodeFromExpression(node.expression);
      bytecodeOutput.push(...expressionBytecode);
      bytecodeOutput.push({ op: "STORE", name: node.variableName });
    }

    else if (node.type === "functionCall") {
      const parsedArgs = parseExpression(node.arguments);
      const argBytecode = generateBytecodeFromExpression(parsedArgs);
      bytecodeOutput.push(...argBytecode);
      bytecodeOutput.push({ op: "PRINT" });  // Replace with a lookup if you add more function types
    }

    pointer++;
  }

  return bytecodeOutput;
}

export default bytecodeGenerator;
