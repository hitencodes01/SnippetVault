import express from 'express'
import connectDB from './config/db.js'
import { configDotenv } from 'dotenv'

const app = express()
configDotenv()
const port = process.env.PORT

app.get("/",(req,res)=>{
    res.send("Welcome to Snippet Vault")
})

app.listen(port,()=>{
    connectDB()
    console.log(`Server listen in port ${port}`)
})  