import lynxTokenizer from "./Compiler/tokenizer.js";
import lynxCompiler from "./Compiler/compiler.js";
import bytecodeGenerator from "./Compiler/bytecodeGenerator.js";
import LVMExec from "./LVM/LVMMain.js";

let input = `

set name = "sahil udar"
set cgpa = 8
set randomExpression = (5+10)*cgpa
consolePrint(randomExpression)
consolePrint(name)

`;
const tokenizerOutput = lynxTokenizer(input);
const compilerOutput = lynxCompiler(tokenizerOutput);
const bytecodeOutput = bytecodeGenerator(compilerOutput);
LVMExec(bytecodeOutput);
