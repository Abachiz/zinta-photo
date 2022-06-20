const { registerUser, loginUser, updateUser } = require('../controllers/usercontroller')

const router = require('express').Router()


router.post('/login', loginUser)
router.post('/register', registerUser)
// router.put('/profile', updateUser)

module.exports = router