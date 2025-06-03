const KEYWORDS = new Set(["set", "consolePrint"]);
const OPERATORS = new Set(["=", "+", "-", "*", "/", "^"]);
const PUNCTUATION = new Set(["(", ")"]);

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

function lynxTokenizer(input) {
  const tokens = [];
  let currentToken = "";
  let inString = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

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

    if (OPERATORS.has(char) || PUNCTUATION.has(char)) {
      if (currentToken.length > 0) {
        tokens.push(classifyToken(currentToken));
        currentToken = "";
      }
      const type = OPERATORS.has(char) ? "OPERATOR" : "PUNCTUATION";
      tokens.push({ type, value: char });
    } else if (/\s/.test(char)){
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

export default lynxTokenizer;
