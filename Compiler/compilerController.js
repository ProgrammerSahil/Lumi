import lumiTokenizer from "./tokenizer.js";
import {lumiCompiler} from "./compiler.js";
import bytecodeGenerator from "./bytecodeGenerator.js";
import LVMExec from "../LVM/LVMMain.js";



function controller(input){
    const tokenizerOutput = lumiTokenizer(input);
    const compilerOutput = lumiCompiler(tokenizerOutput);
    const bytecodeOutput = bytecodeGenerator(compilerOutput);
    const LVMConsole = LVMExec(bytecodeOutput);
    console.log(bytecodeOutput);
    return LVMConsole;
}

export default controller;