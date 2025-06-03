function LVMExec(bytecode) {
  const stack = [];
  const memory = {};
  let ip = 0;

  while (ip < bytecode.length) {
    const instr = bytecode[ip];

    switch (instr.op) {
      case "PUSH":
        stack.push(instr.value);
        break;
      case "ADD":
        let b = stack.pop();
        let a = stack.pop();
        stack.push(a + b);
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
        break;
      case "STORE":
        const value = stack.pop();
        memory[bytecode.name] = value;
        break;
      case "LOAD":
        if (!(bytecode.name in memory)) {
          throw new Error(`Undeclared Variable: ${bytecode.value}`);
        }
        stack.push(memory[bytecode.name]);
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
  { op: 'PUSH', value: 180 },
  { op: 'PUSH', value: 12 },
  { op: 'ADD' },
  { op: 'STORE', name: 'height' },
  { op: 'PUSH', value: 'Sahil Udar' },
  { op: 'STORE', name: 'name' },
  { op: 'LOAD', name: 'height' },
  { op: 'PRINT' }
];

LVMExec(program);
