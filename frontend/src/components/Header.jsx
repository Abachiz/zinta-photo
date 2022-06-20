import { Link }from "react-router-dom"
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {update} from '../reedux/searchslice'
import {update2} from '../reedux/authslice'
import {FaSignInAlt, FaSignOutAlt}from 'react-icons/fa'

function Header(){
    // const user = null
    const inputt = useRef(null)
    const dispatch = useDispatch()

    const handleSubmit =(e)=> {
            e.preventDefault()
            // console.log(inputt)
            dispatch(update(inputt.current.value))
            inputt.current.value=''
    }

    const logout = ()=> {
        localStorage.removeItem('user')
        dispatch(update2(null))
    }
    const user = useSelector(state => state.user.value) || null
    return(
        <div className="header">
            <div className="logo">
                <h3>PhotoGallery</h3>
                </div>
               
                <form onSubmit={handleSubmit}>
                <input type="text" placeholder= "search"
                ref={inputt}/>
                <ion-icon name="search-outline"></ion-icon>
                </form>
                 <ul>
                     {user ?
                     <li style={{display: 'flex', alignItems: 'center', gap: '4px',cursor:'pointer'}} 
                     onClick={logout}>
                        <FaSignOutAlt/> Logout   
                        {' ' + user.name.split(' ')[0]}               
                        </li>:
                    
                    <>
                        <li style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                            <FaSignInAlt/> 
                            <Link to= '/login'>Login</Link>                
                        </li>

                        <li style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                            <FaSignOutAlt/>
                            <Link to= '/register'>Register</Link>                    
                        </li>
                    </>
                    }
                </ul>
            </div>
            
    )
}

export default Header