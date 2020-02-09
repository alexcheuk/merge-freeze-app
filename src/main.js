import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'

dotenv.config()

const app = express()

app.use(morgan('tiny'))

require('./slack/interactives')(app)

app.use(express.json())

require('./slack')(app)
require('./github')(app)

app.listen(3000)

console.log(`
🍦 🍦 🍦 🍦 🍦 🍦 🍦 🍦 🍦 🍦 🍦 🍦 🍦 

Merge Freeze Server Started
Port: 3000

🍦 🍦 🍦 🍦 🍦 🍦 🍦 🍦 🍦 🍦 🍦 🍦 🍦 
`)
