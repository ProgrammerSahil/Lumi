function LVMExec(bytecode){
    const stack = [];
    const memory = {};
    let ip = 0;

    while(ip < bytecode.length){
        const instr = bytecode[ip];

        switch(instr.op){
            case "PUSH":
                stack.push(instr.value);
                break;
            case "ADD":
                let b = stack.pop();
                let a = stack.pop();
                stack.push(a+b);
                break;
            case "SUBTRACT":
                let y = stack.pop();
                let x = stack.pop();
                stack.push(x-y);
                break;
            case "PRINT":
                console.log(stack[stack.length-1]);
                break;
            case "HALT":
                return;
            default:
                throw new Error(`Unknown Instruction: ${instr.op}`);
                
        }

        ip++;

    }

}

const program = [
  { op: "PUSH", value: 10 },
  { op: "PUSH", value: 20 },
  { op: "SUBTRACT" },
  { op: "PUSH", value: 50},
  { op: "ADD"},
  { op: "PRINT" },
  { op: "HALT" }
];

LVMExec(program);


