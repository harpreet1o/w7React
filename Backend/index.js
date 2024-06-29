import express from "express";
import indexRouter from "./routes/routes.js"
import cors from "cors";

const port = process.env.PORT || 3000;

const app=express();

app.use(cors());
app.use(express.json());
app.use("/notes", indexRouter);


app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
   