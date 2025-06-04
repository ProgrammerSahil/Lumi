function LVMExec(bytecode) {
  const stack = [];
  const memory = {};
  let ip = 0;
  const output = [];

  while (ip < bytecode.length) {
    const instr = bytecode[ip];

    switch (instr.op) {
      case "PUSH":
        stack.push(instr.value);
        break;
      case "ADD":
        let b = stack.pop();
        let a = stack.pop();
        stack.push(Number(a) + Number(b));
        break;
      case "SUBTRACT":
        let y = stack.pop();
        let x = stack.pop();
        stack.push(x - y);
        break;
      case "MUL":
        const m2 = stack.pop();
        const m1 = stack.pop();
        stack.push(m1 * m2);
        break;

      case "DIV":
        const d2 = stack.pop();
        const d1 = stack.pop();
        if (d2 === 0) throw new Error("Divide by zero");
        stack.push(d1 / d2);
        break;

      case "POW":
        const exp = stack.pop();
        const base = stack.pop();
        stack.push(Math.pow(base, exp));
        break;
      case "PRINT":
        console.log(stack[stack.length - 1]);
        output.push(stack[stack.length - 1]);
        break;
      case "STORE":
        const value = stack.pop();
        memory[instr.name] = value;
        break;
      case "LOAD":
        if (!(instr.name in memory)) {
          throw new Error(`Undeclared Variable: ${instr.name}`); 
        }
        stack.push(memory[instr.name]); 
        break;
      case "HALT":
        return;
      default:
        throw new Error(`Unknown Instruction: ${instr.op}`);
    }

    ip++;
  }

  return output;
}

export default LVMExec;
