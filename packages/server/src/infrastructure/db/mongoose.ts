import mongoose from 'mongoose'

export const initialize = async () => {
  return new Promise<void>((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_URL || '')

    mongoose.connection.on('error', (err) => {
      reject()

      console.error(err)
      console.log(
        '%s MongoDB connection error. Please make sure MongoDB is running.'
      )
      process.exit()
    })

    resolve()
  })
}
