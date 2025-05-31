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

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === " ") {
      if (currentToken.length > 0) {
        tokens.push(classifyToken(currentToken));
        currentToken = "";
      }
    } else if (PUNCTUATION.has(char)) {
      if (currentToken.length > 0) {
        tokens.push(classifyToken(currentToken));
        currentToken = "";
      }
      tokens.push({ type: "PUNCTUATION", value: char });
    } else {
      currentToken += char;
    }
  }

  if (currentToken.length > 0) {
    tokens.push(classifyToken(currentToken));
  }

  console.log(tokens);
}

const input = "set weight = 23";
lynxTokenizer(input);