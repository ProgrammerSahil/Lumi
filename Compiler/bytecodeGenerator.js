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
    let addressCounter = 0;
    
 
    function calculateAddresses(nodes) {
        for (let node of nodes) {
            if (node.type === "functionDefinition") {
                node.startAddress = addressCounter + 1;
                addressCounter += calculateNodeSize(node);
                node.endAddress = addressCounter - 1;
            } else if (node.type === "whileLoop") {
                node.conditionAddress = addressCounter;
                addressCounter += calculateExpressionSize(node.condition) + 1; 
                node.bodyStartAddress = addressCounter;
                addressCounter += calculateNodesSize(node.body);
                node.bodyEndAddress = addressCounter;
                addressCounter += 1; 
            } else {
                addressCounter += calculateNodeSize(node);
            }
        }
    }
    
    function calculateNodeSize(node) {
        switch (node.type) {
            case "assignment":
                return calculateExpressionSize(node.expression) + 1;
            case "functionCall":
                return calculateExpressionSize(node.arguments) + 1;
            case "return":
                return calculateExpressionSize(node.expression) + 1;
            case "functionDefinition":
                return 1 + calculateNodesSize(node.body) + 1; 
            default:
                return 1;
        }
    }
    
    function calculateExpressionSize(expr) {
        return expr.length;
    }
    
    function calculateNodesSize(nodes) {
        return nodes.reduce((sum, node) => sum + calculateNodeSize(node), 0);
    }
    
    calculateAddresses(compiledCode);
    

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
                    startAddress: node.startAddress,
                    endAddress: node.endAddress
                });
                

                const bodyBytecode = bytecodeGenerator(node.body);
                bytecodeOutput.push(...bodyBytecode);

                if (bodyBytecode.length === 0 || bodyBytecode[bodyBytecode.length - 1].op !== "RETURN") {
                    bytecodeOutput.push({ op: "RETURN" });
                }
                break;
                
            case "whileLoop":
        
                const conditionBytecode = generateBytecodeFromExpression(node.condition);
                bytecodeOutput.push(...conditionBytecode);
                
                const jumpIfFalseAddress = bytecodeOutput.length;
                bytecodeOutput.push({ op: "JUMP_IF_FALSE", address: 0 }); 
                
                const bodyStartAddress = bytecodeOutput.length;
                const loopBodyBytecode = bytecodeGenerator(node.body);
                bytecodeOutput.push(...loopBodyBytecode);
                
                const conditionStartAddress = jumpIfFalseAddress - conditionBytecode.length;
                bytecodeOutput.push({ op: "JUMP", address: conditionStartAddress });
                
                bytecodeOutput[jumpIfFalseAddress].address = bytecodeOutput.length;
                break;
                
            case "return":
                const returnBytecode = generateBytecodeFromExpression(node.expression);
                bytecodeOutput.push(...returnBytecode);
                bytecodeOutput.push({ op: "RETURN" });
                break;
        }
    }
    
    return bytecodeOutput;
}

export default bytecodeGenerator;
