const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const sendEmail = (req, res) => {
  const { name, email, message } = req.body

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `Message from ${name} using ${email}`,
      text: `${message}`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.send('Error')
      } else {
        res.send('success')
      }
    })
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err,
    })
  }
}

module.exports = { sendEmail }
