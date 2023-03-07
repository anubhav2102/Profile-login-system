import React, {useState,useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

const Login = () => {

    const {state,dispatch} = useContext(UserContext);


    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e)=>{
        e.preventDefault();
        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = res.json();
        if(res.status === 400 || !data){
            window.alert("Invalid Credentials")
        }else{
            dispatch({type:"USER", payload:true})
            window.alert("Login Successful")
            navigate("/")
        }
    }

    return (
        <>
            <section className='sign-in'>
            <div className='container mt-5'>
                <div className='signin-content'>
                <div className='signin-image'> 
                            <NavLink to="/signup" className="signup-iamge-link">Create an account</NavLink>
                            </div>
                    <div className='signin-form'>
                        <h2 className='form-title'>
                            Sign In
                        </h2>
                        <form className='register-form' id='register-form' method='POST'>
                            <div className='form-group'>
                                {/* <label htmlFor="email"> Email</label> */}
                                <input type="text" name='email' id='email' autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Your Email'/>
                            </div>
                            <div className='form-group'>
                                {/* <label htmlFor="password"> Account</label> */}
                                <input type="password" name='password' id='password' autoComplete='off' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Your Password'/>
                            </div>
                            <div className='form-group form-button'>
                                <input type="submit" name='signin' id='signin' className='form-submit' value="Log in" onClick={loginUser} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Login