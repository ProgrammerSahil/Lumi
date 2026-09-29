import express from "express";
import controller from "./compilerController.js";

const compilerRouter = express.Router();

compilerRouter.post("/", (req, res) => {
  const inputCode = req.body;
  
  try {
    const output = controller(inputCode);
    res.status(200).json({ 
      success: true,
      message: "Compilation Successful", 
      output: output 
    });
  } catch (error) {
    console.log("Compilation Error:", error);
    res.status(400).json({ 
      success: false,
      error: error.message || "Compilation failed",
      details: error.toString()
    });
  }
});

export default compilerRouter;