const KEYWORDS = new Set(["set", "consolePrint"]);
const OPERATORS = new Set(["=", "+", "-", "*", "/", "^"]);
const PUNCTUATION = new Set(["(", ")"]);

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

  if(currentStack.length > 0){
    program.push([...currentStack]);
  }

  console.log(program);

}

const tokens = [
  { type: "KEYWORD", value: "set" },
  { type: "IDENTIFIER", value: "height" },
  { type: "OPERATOR", value: "=" },
  { type: "NUMBER", value: 180 },
  { type: "KEYWORD", value: "consolePrint" },
  { type: "PUNCTUATION", value: "(" },
  { type: "IDENTIFIER", value: "height" },
  { type: "PUNCTUATION", value: ")" },
];

lynxCompiler(tokens);
