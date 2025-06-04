# Lynx Programming Language 🐺

A lightweight, stack-based programming language built from scratch in JavaScript. Lynx features a custom compiler pipeline that transforms source code into bytecode and executes it on a purpose-built virtual machine.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/status-active%20development-blue)](https://github.com/yourusername/lynx)

## 🌟 Features

- **Complete Compiler Pipeline**: Custom tokenizer, parser, and compiler
- **Bytecode Virtual Machine**: Lynx VM executes compiled bytecode efficiently
- **RESTful API**: Express.js server for remote code execution
- **Mathematical Operations**: Full arithmetic support (`+`, `-`, `*`, `/`, `^`)
- **Variable System**: Dynamic variable assignment and retrieval
- **Built-in Functions**: `consolePrint()` for output operations
- **Beginner-Friendly**: Clean syntax designed for learning

## 🚀 Quick Start

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lynx.git
cd lynx
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
# or
node index.js
```

The server will start on `http://localhost:3000`

### Your First Lynx Program

Send a POST request to `http://localhost:3000/editor` with the following content:

```lynx
consolePrint("Hello, Lynx!")
set myNumber = 42
set result = myNumber * 2
consolePrint(result)
```

## 📖 Language Syntax

### Variable Assignment
```lynx
set variableName = value
set message = "Hello World"
set number = 123
```

### Arithmetic Operations
```lynx
set sum = 10 + 5        # Addition
set diff = 20 - 8       # Subtraction
set product = 6 * 7     # Multiplication
set quotient = 15 / 3   # Division
set power = 2 ^ 8       # Exponentiation
```

### Output
```lynx
consolePrint("Text output")
consolePrint(variableName)
consolePrint(42)
```

## 🔧 API Usage

### Compile and Execute Code

**Endpoint:** `POST /editor`  
**Content-Type:** `text/plain`

#### Example Request
```bash
curl -X POST http://localhost:3000/editor \
  -H "Content-Type: text/plain" \
  -d 'consolePrint("Hello World")
set length = 56
set finalLen = length + 12
consolePrint(finalLen)'
```

#### Example Response
```json
{
  "message": "Compilation Successful:",
  "output": [
    "Hello World",
    68
  ]
}
```

#### Error Response
```json
{
  "error": "Compilation Error",
  "details": "Syntax error at line 2: unexpected token"
}
```

## 📁 Project Structure

```
Lynx/
├── Compiler/
│   ├── tokenizer.js        # Lexical analysis
│   ├── parser.js           # Syntax analysis  
│   ├── compiler.js         # Code generation
│   └── compilerRouter.js   # Express routes
├── VM/
│   └── LVMMain.js         # Lynx Virtual Machine
├── bytecodeGenerator.js    # Bytecode utilities
├── index.js               # Main server file
├── package.json
└── README.md
```

## 🏗️ Architecture

### Compilation Pipeline

1. **Tokenization**: Source code → tokens
2. **Parsing**: Tokens → Abstract Syntax Tree (AST)
3. **Compilation**: AST → bytecode
4. **Execution**: Bytecode → Lynx VM → output

### Virtual Machine

The Lynx VM is a stack-based interpreter that executes bytecode instructions:
- **Stack Management**: Push/pop operations
- **Memory Management**: Variable storage and retrieval
- **Instruction Dispatch**: Bytecode instruction execution

## 🔮 Roadmap

### Coming Soon
- [ ] Conditional statements (`if`, `else`)
- [ ] Loop constructs (`while`, `for`)
- [ ] Function definitions and calls
- [ ] String manipulation functions
- [ ] Array/list support
- [ ] File I/O operations
- [ ] Error handling mechanisms

### Future Enhancements
- [ ] Web-based IDE
- [ ] Debugging tools
- [ ] Standard library expansion
- [ ] Performance optimizations
- [ ] Module system

## 🧪 Development

### Running Tests
```bash
npm test
```

### Development Mode
```bash
npm run dev  # Runs with nodemon for auto-restart
```

### Linting
```bash
npm run lint
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Add tests** for new functionality
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add JSDoc comments for new functions
- Include tests for new features
- Update documentation as needed

## 📝 Examples

### Basic Calculator
```lynx
set a = 10
set b = 5
consolePrint("Addition:")
consolePrint(a + b)
consolePrint("Multiplication:")
consolePrint(a * b)
consolePrint("Power:")
consolePrint(a ^ 2)
```

### Variable Manipulation
```lynx
set name = "Lynx"
set version = 1.0
set description = "Programming Language"
consolePrint(name)
consolePrint(version)
set total = version * 100
consolePrint(total)
```

## 🐛 Known Issues

- String concatenation not yet implemented
- Limited error reporting in current version
- No support for floating-point arithmetic precision handling

## 📜 License

This project is licensed under the MIT License 

## 🙏 Acknowledgments

- Inspired by stack-based programming languages
- Built as a learning project to understand compiler design
- Thanks to the JavaScript and Node.js communities

---

⭐ **Star this repository if you find it helpful!**