import { parseExpression } from "./compiler.js";

function generateBytecodeFromExpression(expression) {
    const bytecode = [];
    
    for (let token of expression) {
        if (token.type === "NUMBER" || token.type === "STRING") {
            bytecode.push({ op: "PUSH", value: token.value });
        } else if (token.type === "IDENTIFIER") {
            bytecode.push({ op: "LOAD", name: token.value });
        } else if (token.type === "OPERATOR") {
            switch (token.value) {
                case "+": bytecode.push({ op: "ADD" }); break;
                case "-": bytecode.push({ op: "SUBTRACT" }); break;
                case "*": bytecode.push({ op: "MUL" }); break;
                case "/": bytecode.push({ op: "DIV" }); break;
                case "^": bytecode.push({ op: "POW" }); break;
                case "<": bytecode.push({ op: "LESSTHAN" }); break;
                case ">": bytecode.push({ op: "GREATERTHAN" }); break;
                case "==": bytecode.push({ op: "EQUALS" }); break;
                case "<=": bytecode.push({ op: "LESSTHANEQUALS" }); break;
                case ">=": bytecode.push({ op: "GREATERTHANEQUALS" }); break;
                case "!=": bytecode.push({ op: "NOTEQUALS" }); break;
                default: throw new Error("Unsupported operator: " + token.value);
            }
        }
    }
    
    return bytecode;
}

function bytecodeGenerator(compiledCode) {
    const bytecodeOutput = [];
    

    if (!compiledCode || !Array.isArray(compiledCode)) {
        console.warn("compiledCode is not an array:", compiledCode);
        return bytecodeOutput;
    }
    
    for (let node of compiledCode) {
        switch (node.type) {
            case "assignment":
                const expressionBytecode = generateBytecodeFromExpression(node.expression);
                bytecodeOutput.push(...expressionBytecode);
                bytecodeOutput.push({ op: "STORE", name: node.variableName });
                break;
                
            case "functionCall":
                if (node.functionName === "consolePrint") {
                    const argBytecode = generateBytecodeFromExpression(parseExpression(node.arguments));
                    bytecodeOutput.push(...argBytecode);
                    bytecodeOutput.push({ op: "PRINT" });
                } else {
                    const argBytecode = generateBytecodeFromExpression(parseExpression(node.arguments));
                    bytecodeOutput.push(...argBytecode);
                    bytecodeOutput.push({ op: "CALL_FUNCTION", name: node.functionName });
                }
                break;
                
            case "functionDefinition":
                bytecodeOutput.push({
                    op: "DEFINE_FUNCTION",
                    name: node.name,
                    parameters: node.parameters,
                    startAddress: bytecodeOutput.length + 2 
                });
                
             
                const jumpOverFunction = bytecodeOutput.length;
                bytecodeOutput.push({ op: "JUMP", address: 0 }); 
                
             
                const bodyBytecode = bytecodeGenerator(node.body);
                bytecodeOutput.push(...bodyBytecode);


                
             
                bytecodeOutput[jumpOverFunction].address = bytecodeOutput.length;
                break;
                
            case "whileLoop":
                const conditionStart = bytecodeOutput.length;
                const conditionBytecode = generateBytecodeFromExpression(node.condition);
                bytecodeOutput.push(...conditionBytecode);
                
                const jumpIfFalseAddress = bytecodeOutput.length;
                bytecodeOutput.push({ op: "JUMP_IF_FALSE", address: 0 });
                
                const loopBodyBytecode = bytecodeGenerator(node.body);
                bytecodeOutput.push(...loopBodyBytecode);
                
                bytecodeOutput.push({ op: "JUMP", address: conditionStart });
                
                bytecodeOutput[jumpIfFalseAddress].address = bytecodeOutput.length;
                break;
                
            case "ifStatement":
        
                const ifConditionBytecode = generateBytecodeFromExpression(node.condition);
                bytecodeOutput.push(...ifConditionBytecode);
                

                const jumpIfFalseIdx = bytecodeOutput.length;
                bytecodeOutput.push({ op: "JUMP_IF_FALSE", address: 0 });
                

                const ifBodyBytecode = bytecodeGenerator(node.body);
                bytecodeOutput.push(...ifBodyBytecode);
                


                bytecodeOutput[jumpIfFalseIdx].address = bytecodeOutput.length;
                break;
                
            case "return":
                const returnBytecode = generateBytecodeFromExpression(node.expression);
                bytecodeOutput.push(...returnBytecode);
                bytecodeOutput.push({ op: "RETURN" });
                break;
                
            default:
                console.warn("Unknown node type:", node.type);
                break;
        }
    }
    
    return bytecodeOutput;
}

export default bytecodeGenerator;