import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
configDotenv()
export default function generateToken(id){
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d'
    })
}