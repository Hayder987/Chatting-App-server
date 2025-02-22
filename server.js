
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000


// root route
app.get('/', (req, res)=>{
    res.send(`Welcome to OR Chatting App`)
})

app.get('/api/auth/signup', (req, res)=>{
    console.log('sign up')
})

app.get('/api/auth/login', (req, res)=>{
    console.log('login')
})

app.get('/api/auth/logout', (req, res)=>{
    console.log('logout')
})

app.listen(PORT, ()=>{
    console.log(`server running At:${PORT}`)
})

