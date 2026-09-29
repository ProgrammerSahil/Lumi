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

function parseBlock(tokens, start, end) {
  const statements = [];
  let current = [];

  for (let i = start; i <= end; i++) {
    if (tokens[i].type === "PUNCTUATION" && tokens[i].value === ";") {
      if (current.length > 0) {
        statements.push([...current]);
        current = [];
      }
    } else {
      current.push(tokens[i]);
    }
  }

  if (current.length > 0) {
    statements.push(current);
  }

  return statements;
}

function lumiCompiler(tokenList) {
  const program = [];
  let i = 0;

  while (i < tokenList.length) {
    const token = tokenList[i];

    if (token.type === "KEYWORD") {
      switch (token.value) {
        case "function":
          const funcName = tokenList[i + 1].value;
          const parameters = [];

          let paramStart = i + 3;
          let paramEnd = paramStart;

          while (tokenList[paramEnd].value !== ")") {
            if (tokenList[paramEnd].type === "IDENTIFIER") {
              parameters.push(tokenList[paramEnd].value);
            }
            paramEnd++;
          }

          let braceCount = 0;
          let bodyStart = paramEnd + 2;
          let bodyEnd = bodyStart;

          for (let j = bodyStart; j < tokenList.length; j++) {
            if (tokenList[j].value === "{") braceCount++;
            else if (tokenList[j].value === "}") {
              braceCount--;
              if (braceCount === -1) {
                bodyEnd = j - 1;
                break;
              }
            }
          }

          const bodyStatements = parseBlock(tokenList, bodyStart, bodyEnd);
          const compiledBody = [];

          for (let stmt of bodyStatements) {
            compiledBody.push(...lumiCompiler(stmt));
          }

          program.push({
            type: "functionDefinition",
            name: funcName,
            parameters: parameters,
            body: compiledBody,
          });

          i = bodyEnd + 2;
          break;

        case "while":
          let condStart = i + 2;
          let condEnd = condStart;
          let parenCount = 1;

          while (parenCount > 0) {
            condEnd++;
            if (tokenList[condEnd].value === "(") parenCount++;
            else if (tokenList[condEnd].value === ")") parenCount--;
          }

          const condition = tokenList.slice(condStart, condEnd);

          let loopBraceCount = 0;
          let loopBodyStart = condEnd + 2;
          let loopBodyEnd = loopBodyStart;

          for (let j = loopBodyStart; j < tokenList.length; j++) {
            if (tokenList[j].value === "{") loopBraceCount++;
            else if (tokenList[j].value === "}") {
              loopBraceCount--;
              if (loopBraceCount === -1) {
                loopBodyEnd = j - 1;
                break;
              }
            }
          }

          const loopBodyStatements = parseBlock(
            tokenList,
            loopBodyStart,
            loopBodyEnd
          );
          const compiledLoopBody = [];

          for (let stmt of loopBodyStatements) {
            compiledLoopBody.push(...lumiCompiler(stmt));
          }

          program.push({
            type: "whileLoop",
            condition: parseExpression(condition),
            body: compiledLoopBody,
          });

          i = loopBodyEnd + 2;
          break;

        case "if":
      
          let ifCondStart = i + 2; 
          let ifCondEnd = ifCondStart;
          let ifParenCount = 1;

          while (ifParenCount > 0 && ifCondEnd < tokenList.length) {
            ifCondEnd++;
            if (tokenList[ifCondEnd].value === "(") ifParenCount++;
            else if (tokenList[ifCondEnd].value === ")") ifParenCount--;
          }

          const ifCondition = tokenList.slice(ifCondStart, ifCondEnd);

          let ifBraceCount = 0;
          let ifBodyStart = ifCondEnd + 2;
          let ifBodyEnd = ifBodyStart;

          for (let j = ifBodyStart; j < tokenList.length; j++) {
            if (tokenList[j].value === "{") ifBraceCount++;
            else if (tokenList[j].value === "}") {
              ifBraceCount--;
              if (ifBraceCount === -1) {
                ifBodyEnd = j - 1;
                break;
              }
            }
          }

          const ifBodyStatements = parseBlock(tokenList, ifBodyStart, ifBodyEnd);
          const compiledIfBody = [];

          for (let stmt of ifBodyStatements) {
            compiledIfBody.push(...lumiCompiler(stmt));
          }

         
          let nextTokenIndex = ifBodyEnd + 2;
          let elseBody = [];
          
          if (nextTokenIndex < tokenList.length && 
              tokenList[nextTokenIndex].type === "KEYWORD" && 
              tokenList[nextTokenIndex].value === "else") {
            
            
            let elseBraceCount = 0;
            let elseBodyStart = nextTokenIndex + 2; 
            let elseBodyEnd = elseBodyStart;

            for (let j = elseBodyStart; j < tokenList.length; j++) {
              if (tokenList[j].value === "{") elseBraceCount++;
              else if (tokenList[j].value === "}") {
                elseBraceCount--;
                if (elseBraceCount === -1) {
                  elseBodyEnd = j - 1;
                  break;
                }
              }
            }

            const elseBodyStatements = parseBlock(tokenList, elseBodyStart, elseBodyEnd);
            
            for (let stmt of elseBodyStatements) {
              elseBody.push(...lumiCompiler(stmt));
            }

            i = elseBodyEnd + 2; 
          } else {
            i = ifBodyEnd + 2; 
          }

          program.push({
            type: "ifElseStatement",
            condition: parseExpression(ifCondition),
            ifBody: compiledIfBody,
            elseBody: elseBody,
          });

          break;

        case "set":
          let statementEnd = i + 1;
          while (statementEnd < tokenList.length && 
                 tokenList[statementEnd].type !== "KEYWORD") {
            statementEnd++;
          }
          let assignPos = i + 2;
          while (assignPos < statementEnd && 
                 (tokenList[assignPos].type !== "OPERATOR" || tokenList[assignPos].value !== "=")) {
            assignPos++;
          }
          
          if (assignPos >= statementEnd) {
            throw new Error("Assignment operator '=' not found in set statement");
          }
          
          const expressionTokens = tokenList.slice(assignPos + 1, statementEnd);
          
          program.push({
            type: "assignment",
            variableName: tokenList[i + 1].value,
            expression: parseExpression(expressionTokens),
          });
          
          i = statementEnd; 
          break;

        case "consolePrint":
          let printEnd = i + 1;
          while (printEnd < tokenList.length && 
                 tokenList[printEnd].type !== "KEYWORD") {
            printEnd++;
          }
          
          let argStart = i + 2; 
          let argEnd = printEnd - 1; 
          
          if (tokenList[i + 1].value === "(" && tokenList[argEnd].value === ")") {
            program.push({
              type: "functionCall",
              functionName: "consolePrint",
              arguments: tokenList.slice(argStart, argEnd),
            });
          } else {
            throw new Error("Invalid consolePrint syntax");
          }
          
          i = printEnd;
          break;

        case "return":
          let returnEnd = i + 1;
          while (returnEnd < tokenList.length && 
                 tokenList[returnEnd].type !== "KEYWORD" &&
                 !(tokenList[returnEnd].type === "PUNCTUATION" && tokenList[returnEnd].value === "}")) {
            returnEnd++;
          }

          program.push({
            type: "return",
            expression: returnEnd > i + 1 ? parseExpression(tokenList.slice(i + 1, returnEnd)) : [],
          });
          
          i = returnEnd;
          break;

        default:
          i++;
      }
    } else if (token.type === "IDENTIFIER") {
      const nextToken = tokenList[i + 1];

      if (
        nextToken &&
        nextToken.type === "PUNCTUATION" &&
        nextToken.value === "("
      ) {
        const args = [];
        let argStart = i + 2;
        let parenDepth = 1;
        let j = argStart;

        while (j < tokenList.length && parenDepth > 0) {
          if (tokenList[j].type === "PUNCTUATION" && tokenList[j].value === "(")
            parenDepth++;
          else if (
            tokenList[j].type === "PUNCTUATION" &&
            tokenList[j].value === ")"
          )
            parenDepth--;

          if (parenDepth > 0) {
            args.push(tokenList[j]);
          }

          j++;
        }

        program.push({
          type: "functionCall",
          functionName: token.value,
          arguments: args,
        });

        i = j;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }

  return program;
}

export { lumiCompiler, parseExpression };