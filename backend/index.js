import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import {UserRouter} from "./routes/index.js"
import dotenv from "dotenv"


const app = express();

dotenv.config();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(`mongodb+srv://${process.env.DB_URL}:${process.env.DB_PASS}@cluster0.awc1psv.mongodb.net/randomJson`)
.then(console.log("Connected to database"))
.catch((err)=> console.error(err));

app.use("/",UserRouter);

app.listen(3001,()=>{
    console.log("Backened applicaiton is running!")
})