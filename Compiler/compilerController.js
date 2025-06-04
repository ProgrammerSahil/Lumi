import lynxTokenizer from "./tokenizer.js";
import lynxCompiler from "./compiler.js";
import bytecodeGenerator from "./bytecodeGenerator.js";
import LVMExec from "../LVM/LVMMain.js";



function controller(input){
    const tokenizerOutput = lynxTokenizer(input);
    const compilerOutput = lynxCompiler(tokenizerOutput);
    const bytecodeOutput = bytecodeGenerator(compilerOutput);
    const LVMConsole = LVMExec(bytecodeOutput);
    return LVMConsole;
}

export default controller;