import express from 'express'
import connectDB from './config/db.js'
import { configDotenv } from 'dotenv'
import auth from './routes/authRoutes.js'

const app = express()
app.use(express.json())
configDotenv()
const port = process.env.PORT

app.get("/",(req,res)=>{
    res.send("Welcome to Snippet Vault")
})

app.use('/api/auth', auth)

app.listen(port,()=>{
    connectDB()
    console.log(`Server listen in port ${port}`)
})  