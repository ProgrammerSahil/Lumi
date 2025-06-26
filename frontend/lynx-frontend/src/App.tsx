import { useState } from 'react'
import './App.css'

function App() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [isCompiling, setIsCompiling] = useState(false)
  const [error, setError] = useState('')

  const compileCode = async () => {
    if (!code.trim()) {
      setError('Please enter some code to compile')
      return
    }

    setIsCompiling(true)
    setError('')
    setOutput('Compiling...')

    try {
      const response = await fetch('http://localhost:3000/editor', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: code
      })

      const result = await response.json()
      
      if (response.ok) {
        setOutput(result.output || 'Compilation successful (no output)')
      } else {
        setError(result.error || 'Compilation failed')
        setOutput('')
      }
    } catch (err) {
      setError('Failed to connect to compiler service')
      setOutput('')
    } finally {
      setIsCompiling(false)
    }
  }

  return (
    <>
      <h1 className="compilerHeader">Lumi Compiler</h1>
      <div className="mainContainer">
        <div className="editorSection">
          <h3>Source Code</h3>
          <textarea 
            name="code" 
            id="code" 
            className="sourceCodeContainer"
            rows={20}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Lumi code here..."
            spellCheck="false"
          />
          <button 
            className="compileButton" 
            onClick={compileCode}
            disabled={isCompiling}
          >
            {isCompiling ? 'Compiling...' : 'Compile & Run'}
          </button>
        </div>
        
        <div className="outputSection">
          <h3>Output</h3>
          <div className="outputContainer">
            {error ? (
              <div className="errorOutput">{error}</div>
            ) : (
              <pre className="codeOutput">{output || ''}</pre>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App