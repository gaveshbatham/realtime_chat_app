import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routers/auth.route.js"
import {connectDB} from "./lib/db.js"


const app=express()
dotenv.config()
const PORT=process.env.PORT

app.use(express.json())
app.use('/api/auth' , authRoutes)


app.listen(PORT,()=>{
    console.log(`server is run ing on ${PORT}`)
    connectDB()
})