import mongoose from 'mongoose'

export const initialize = async () => {
  try {
    if (import.meta.env.PROD) {
      await mongoose.connect(process.env.MONGO_DB_URL || '', {
        // tls: true,
        // tlsCAFile: '/etc/certs/global-bundle.pem',
      })
    } else {
      await mongoose.connect(process.env.MONGO_DB_URL || '')
    }

    console.log('MongoDB connected')
  } catch (error) {
    console.error(error)
    console.log(
      '%s MongoDB connection error. Please make sure MongoDB is running.'
    )
    process.exit()
  }
}
