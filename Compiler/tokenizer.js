const KEYWORDS = new Set(["set", "consolePrint"]);
const OPERATORS = new Set(["=", "+", "-", "*", "/", "^"]);
const PUNCTUATION = new Set(["(", ")"]);

function lynxTokenizer(input){
    const inputLength = input.length;
    let iterator = 0;
    const tokens = [];
    let currentToken = "";



    while(iterator < inputLength){
        
        if(input[iterator] === " "){
            while(input[iterator] === " ") iterator++;
            
            
            if(KEYWORDS.has(currentToken)){
                tokens.push({type: "KEYWORD", value: currentToken});
            } else if(OPERATORS.has(currentToken)){
                tokens.push({type: "OPERATOR", value: currentToken });
            } else if(!isNaN(currentToken)){
                tokens.push({type: "NUMBER", value: Number(currentToken)});
            } else{
                tokens.push({type: "IDENTFIER", value: currentToken});
            }
            


            currentToken="";
            continue;
        }
        currentToken+=input[iterator];
        iterator++;
    }
    if(currentToken.length > 0) parseArray.push(currentToken);

    console.log(tokens);


}


const input = "set    height = 12   "

lynxTokenizer(input);
