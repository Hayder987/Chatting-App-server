
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectedToMongoDb from './db/connectedToMongoDB.js'

const app = express()
const PORT = process.env.PORT || 5000

dotenv.config()
app.use(express.json())

app.use('/api/auth', authRoutes)


// root route
app.get('/', (req, res)=>{
    res.send(`Welcome to OR Chatting App`)
})

app.listen(PORT, ()=>{
    connectedToMongoDb()
    console.log(`server running At:${PORT}`)
})

