const User = require('../models/userModel')
const bcrypt = require('bcrypt')

//desc register user
//route POST /api/user/register
// access public
const registerUser= async(req, res) => {
    const {name, email, password} = req.body


    //validate 
    if(!name || !email || !password){
        res.status(400)
       return res.json({message: 'Dude.....input all fields'})
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)

    // check if user already exists
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
      return  res.json({message: 'Email already exist'})
    }


    // register user
    const user = User.create({
        name,
        email,
        password: hashedpassword
    })
    if(user){
        res.status(200)
        res.json({
            id: user._id,
            name,
            email,
            password: hashedpassword,
        })
    }else{
        res.status(400)
       return res.json({message: 'User not created'})
    }
}

//desc add user
//route POST /api/user/register
// access public
const loginUser= async(req, res) => {
    const {email, password} =req.body

    const userExist = await User.findOne({email})
    // console.log(userExist)
    if (userExist && await bcrypt.compare(password, userExist.password)){
        res.status(200).json({
            id:userExist.id,
            name: userExist.name,
            email,
        })
    }else{
        return res.status(400).json({message: 'Invalid credentials'})
    }
    
}
const updateUser= (req, res) => {
    res.send('Updated')
}

module.exports = {
    loginUser,
    registerUser
    // updateUser
}