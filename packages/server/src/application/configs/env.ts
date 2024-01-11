import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const envPath = import.meta.env.PROD
  ? path.resolve(__dirname, '../../../.env')
  : path.resolve(__dirname, '../../../../../.env')

const envTemplatePath = import.meta.env.PROD
  ? path.resolve(__dirname, '../../../.env.example')
  : path.resolve(__dirname, '../../../../../.env.example')

dotenv.config({
  path: envPath,
})

const requiredEnvKeys = Object.keys(
  dotenv.parse(fs.readFileSync(envTemplatePath))
)

const missingEnvs: string[] = []
requiredEnvKeys.forEach((key) => {
  if (!process.env[key]) {
    missingEnvs.push(key.trim())
  }
})

if (missingEnvs.length > 0) {
  console.error('Application missing ENV:\n\t', missingEnvs.join('\n\t'))
  process.exit(1)
}
