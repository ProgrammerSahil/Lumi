import express from "express";
import cors from "cors";
import compilerRouter from "./Compiler/compilerRouter.js";

const port = 3000;

const app = express();

app.use(cors());
app.use(express.text());

app.use("/editor", compilerRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
