import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import{ useDispatch } from "react-redux"
import {update2} from '../reedux/authslice'
import { toast } from 'react-toastify'

function Login(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] =useState({
        email: '',
        password: ''
       
    })
    
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const {email, password} =formData

    const handleSubmit= async (e) => {
        e.preventDefault()
    if(!email && !password){
        toast.error('please input all fields')
    }
try {
    const res = await axios.post('http://localhost:5000/api/users/login', formData)
    console.log(res)
    if(res.data){
       localStorage.setItem('user', JSON.stringify(res.data))
       dispatch(update2(JSON.parse(localStorage.getItem('user'))))
        navigate('/')
} 
}catch (error) {
    if(error.response.data.message === "invaild credentials"){
        toast.error('invalid credentials')
    }
}
       
 
    }
    
    return(
        <>
        <div className="login">
            <h1>please login to start using our services</h1>
            <form onSubmit={handleSubmit}>
            <input type="email" placeholder="please input email" name="email" value={email} onChange={onChange}/>
                <input type="password" placeholder="please input a password" name="password" value={password} onChange={onChange}/>
                <button type="submit">Login</button>
            </form>
        </div>
        </>
    )
}
export default Login