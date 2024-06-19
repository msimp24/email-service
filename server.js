const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const { sendEmail } = require('./emailService')
dotenv.config({ path: './config.env' })

const app = express()
app.use(express.json())
app.use(express.raw())
app.use(cors())
app.use(morgan('dev'))

const router = express.Router()

router.route('/').post(sendEmail)

app.use('/contact', router)

app.listen(8080, () => {
  console.log('Listening on port 8080')
})
