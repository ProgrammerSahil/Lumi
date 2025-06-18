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
        const b = stack.pop();
        const a = stack.pop();
        if (typeof a === "string" || typeof b === "string") {
          stack.push(String(a) + String(b));
        } else {
          stack.push(a + b);
        }
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
      case "LESSTHAN":
        const q = stack.pop();
        const p = stack.pop();
        stack.push(p < q);
        break;
      case "GREATERTHAN":
        const val2 = stack.pop();
        const val1 = stack.pop();
        stack.push(val1 > val2);
        break;
      case "EQUALS":
        const val4 = stack.pop();
        const val3 = stack.pop();
        stack.push(val3 === val4 ? true : false);
        break;
      case "LESSTHANEQUALS":
        const val6 = stack.pop();
        const val5 = stack.pop();
        stack.push(val5 <= val6);
        break;
      case "GREATERTHANEQUALS":
        const val8 = stack.pop();
        const val7 = stack.pop();
        stack.push(val7 >= val8);
        break;
      case "NOTEQUALS":
        const val10 = stack.pop();
        const val9 = stack.pop();
        stack.push(val9 != val10);
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
