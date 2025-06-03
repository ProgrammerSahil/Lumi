function bytecodeGenerator(compiledCode) {
  let pointer = 0;
  const bytecodeOutput = [];

  while (pointer < compiledCode.length) {
    if (compiledCode[pointer].type === "assignment") {
      for (let exp of compiledCode[pointer].expression) {
        if (exp.type === "NUMBER" || exp.type === "STRING") {
          bytecodeOutput.push({ op: "PUSH", value: exp.value });
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
          }
        }
      }
      bytecodeOutput.push({
        op: "STORE",
        name: compiledCode[pointer].variableName,
      });
    } else if (compiledCode[pointer].type === "functionCall") {
      for (let arg of compiledCode[pointer].arguments) {
        if (arg.type === "IDENTIFIER") {
          bytecodeOutput.push({ op: "LOAD", name: arg.value });
        } else if (arg.type === "STRING" || arg.type === "NUMBER") {
          bytecodeOutput.push({ op: "PUSH", value: arg.value });
        }
      }
      bytecodeOutput.push({ op: "PRINT" });
    }
    pointer++;
  }

  return bytecodeOutput;

}

export default bytecodeGenerator;
