const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/mongodb')
const connectCloudinary = require('./config/cloudinary')

// Middleware
app.use(express.json())
app.use(cors())

// DB & Cloudinary
connectDB()
connectCloudinary()

// API Routes (to be added per phase)
const userRouter    = require('./routes/userRoute')
const doctorRouter  = require('./routes/doctorRoute')
const adminRouter   = require('./routes/adminRoute')

app.use('/api/user',   userRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/admin',  adminRouter)

// Health check
app.get('/', (req, res) => {
  res.send('🩺 Prescripto API is running...')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
