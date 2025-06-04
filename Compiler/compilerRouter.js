import express from "express";
import controller from "./compilerController.js";

const compilerRouter = express.Router();

compilerRouter.post("/", (req, res) => {
  const inputCode = req.body;
  try{
    const output = controller(inputCode);
    res.json({ message: "Compilation Successful: ", output: output });
  } catch(e){
    console.log(e);
  }

  
});

export default compilerRouter;
