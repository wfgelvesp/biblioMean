import express from "express";
import cors from "cors";
import db from "./db/db.js"
import dotenv from "dotenv";
import  client from "./routes/clients.js";
import book from "./routes/books.js";
import providers from "./routes/providers.js";

dotenv.config();

const app=express();

app.use(express.json());
app.use(cors());

app.use("/api/providers",providers);
app.use("/api/clients",client);
app.use("/api/books",book);


app.listen(process.env.PORT,()=>console.log("puerto "+process.env.PORT));

db.dbConnection();
