import express from "express"
import cors from "cors";
import dbConnect from "./DB/dbConnect.js";
import authRouter from  './route/authUser.js'
import messageRouter from './route/messageRout.js'
import userRouter from './route/userRout.js'
import cookieParser from "cookie-parser";
import path from "path";
import {app , server} from './Socket/socket.js'


const __dirname = path.resolve();

dbConnect();


app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)
app.use('/api/user',userRouter)

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>{
    dbConnect();
    console.log(`Working at ${PORT}`);
})