import express from "express";

const compilerRouter = express.Router();

compilerRouter.post("/", (req, res) => {
  const inputCode = req.body.input;
  console.log("Received input:", inputCode);

  res.json({ message: "Input received!", received: inputCode });
});

export default compilerRouter;
