const express = require('express')
const { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel } = require('../controllers/adminController')
const upload = require('../middlewares/multer')
const authAdmin = require('../middlewares/authAdmin')

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors', authAdmin, allDoctors)

adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)

module.exports = adminRouter
