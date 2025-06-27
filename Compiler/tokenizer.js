const KEYWORDS = new Set([
    "set", "consolePrint", "function", "return",
    "while", "for", "if", "else", "break", "continue"
]);
const OPERATORS = new Set(["=", "+", "-", "*", "/", "^", "<", ">", "<=", ">=", "==", "!="]);
const PUNCTUATION = new Set(["(", ")", "{", "}", ",", ";"]);

function classifyToken(token) {
    if (KEYWORDS.has(token)) {
        return { type: "KEYWORD", value: token };
    } else if (OPERATORS.has(token)) {
        return { type: "OPERATOR", value: token };
    } else if (!isNaN(token)) {
        return { type: "NUMBER", value: Number(token) };
    } else {
        return { type: "IDENTIFIER", value: token };
    }
}

function lumiTokenizer(input) {
    input = input.trim();
    const tokens = [];
    let currentToken = "";
    let inString = false;
    
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const nextChar = input[i + 1];
        const twoCharOp = char + nextChar;
        
        if (char === '"') {
            if (inString) {
                tokens.push({ type: "STRING", value: currentToken });
                currentToken = "";
                inString = false;
            } else {
                if (currentToken.length > 0) {
                    tokens.push(classifyToken(currentToken));
                    currentToken = "";
                }
                inString = true;
            }
            continue;
        }
        
        if (inString) {
            currentToken += char;
            continue;
        }
        
        if (["<=", ">=", "==", "!="].includes(twoCharOp)) {
            if (currentToken.length > 0) {
                tokens.push(classifyToken(currentToken));
                currentToken = "";
            }
            tokens.push({ type: "OPERATOR", value: twoCharOp });
            i++;
        } else if (OPERATORS.has(char) || PUNCTUATION.has(char)) {
            if (currentToken.length > 0) {
                tokens.push(classifyToken(currentToken));
                currentToken = "";
            }
            const type = OPERATORS.has(char) ? "OPERATOR" : "PUNCTUATION";
            tokens.push({ type, value: char });
        } else if (/\s/.test(char)) {
            if (currentToken.length > 0) {
                tokens.push(classifyToken(currentToken));
                currentToken = "";
            }
        } else {
            currentToken += char;
        }
    }
    
    if (currentToken.length > 0) {
        tokens.push(classifyToken(currentToken));
    }
    
    return tokens;
}

export default lumiTokenizer