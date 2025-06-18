import './App.css'

function App() {
  

  return (
    <>
      <h1 className="compilerHeader">Compiler</h1>
      <div className="mainContainer">
        <textarea 
          name="code" 
          id="code" 
          className="sourceCodeContainer"
          rows={20}
          cols={80}
        />
      </div>
    </>
  )
}

export default App