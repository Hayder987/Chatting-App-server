
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000


// root route
app.get('/', (req, res)=>{
    res.send(`Welcome to OR Chatting App`)
})

app.use('/api/auth', authRoutes)

app.listen(PORT, ()=>{
    console.log(`server running At:${PORT}`)
})

