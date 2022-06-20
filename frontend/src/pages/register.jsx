import {useState} from "react"
import { toast } from "react-toastify"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import{ useDispatch } from "react-redux"
import {update2} from '../reedux/authslice'


function Register(){
const navigate = useNavigate()
const dispatch = useDispatch()
const [formData, setFormData] =useState({
    name: '',
    email: '',
    password: '',
    password2: ''
})

const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]:e.target.value
    }))
}
const {name, email, password , password2} = formData

const handleSubmit= async (e) => {
    e.preventDefault()
 if(password !== password2){
     toast.error('password does not match')
 }

 if(!email && !password && !password2 && !name){

    toast.error('please input all fields')
        
 }
 try {
     const res = await axios.post('http://localhost:5000/api/users/register', formData)
 console.log(res)
 if(res.data){
     localStorage.setItem('user', JSON.stringify(res.data))
    dispatch(update2(JSON.parse(localStorage.getItem('user'))))
     navigate('/')
 }
 } catch (error) {
     if(error.message === "network error"){
        toast.error('please check your connection')
    }   
  if(error.response.data.message && error.response.data.message ==="Email already exist"){
      toast.error('Email already exists')
  }
 }}
    return(
        <>
        <div className="login">
            <h1>please register to start using our services</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="please input username" name="name" value={name} onChange={onChange}/>
                <input type="email" placeholder="please input email" name="email" value={email} onChange={onChange}/>
                <input type="password" placeholder="please input a password" name="password" value={password} onChange={onChange}/>
                <input type="password" placeholder=" please confirm your password" name="password2" value={password2} onChange={onChange}/>
                <button type="submit" style={{cursor:'pointer'}}>Register</button>
            </form>
        </div>
        </>
    )
}export default Register