import dotenv from 'dotenv'
import express from 'express'
import logger from 'morgan'
import mongoose from 'mongoose'
import chalk from 'chalk'
import expressStatusMonitor from 'express-status-monitor'
import bodyParser from 'body-parser'
import errorHandler from 'errorhandler'
import path from 'path'
import fs from 'fs'

dotenv.config()

const app = express()

/**
 * Mongoose Config
 */
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)

mongoose.connect(process.env.MONGO_DB_URL)
mongoose.connection.on('error', (err) => {
  console.error(err)
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'))
  process.exit()
})

const modelsPath = path.join(__dirname, 'models')
fs.readdirSync(modelsPath)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(path.join(modelsPath, file)))

/**
 * Express Config
 */
app.set('host', process.env.host || '0.0.0.0')
app.set('port', process.env.PORT || 3000)
app.use(expressStatusMonitor())
app.use(logger('dev'))

/**
 * Routes required before bodyParser middleware
 */
require('./configs/routes.slack.interactive')(app)

/**
 * Routes
 */
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

require('./configs/routes')(app)

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler())
} else {
  app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('Server Error')
  })
}

app.listen(app.get('port'), () => {
  console.log(`

${chalk.blueBright('Merge Freeze')} App Server Started
Port: 3000

`)
})
