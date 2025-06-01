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

  for(let i=0; i<program.length; i++){
    switch(program[i][0].value){
      case "set":
        program[i] = {
          type: "assignment",
          variableName: program[i][1].value,
          expression: program[i].slice(3)
        }
        break;
      case "consolePrint":
        program[i] = {
          type: "functionCall",
          functionName: program[i][0].value,
          arguments: program[i].slice(2, -1)
        }
    }
  }

  console.log(JSON.stringify(program, null, 3));

  

  

}

const tokens = [
  { type: 'KEYWORD', value: 'set' },
  { type: 'IDENTIFIER', value: 'height' },
  { type: 'OPERATOR', value: '=' },
  { type: 'NUMBER', value: 180 },
  { type: 'OPERATOR', value: '+' },
  { type: 'NUMBER', value: 12 },
  { type: 'KEYWORD', value: 'set' },
  { type: 'IDENTIFIER', value: 'name' },
  { type: 'OPERATOR', value: '=' },
  { type: 'STRING', value: 'Sahil Udar' },
  { type: 'KEYWORD', value: 'consolePrint' },
  { type: 'PUNCTUATION', value: '(' },
  { type: 'IDENTIFIER', value: 'height' },
  { type: 'PUNCTUATION', value: ')' }
];

lynxCompiler(tokens);
