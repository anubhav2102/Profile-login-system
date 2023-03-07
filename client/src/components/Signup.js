import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    })

    let name,value;
    const handleInputs = (e)=>{
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value});
    }

    const PostData = async (e) =>{
        e.preventDefault();
        const {name, email, phone, work, password, cpassword} = user;
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        })
        const data = await res.json();
        if(data.status === 422 || !data){
            window.alert("Invalid Registration")
            console.log("Invalid Registration");
        }else{
            window.alert("Registration successful")
            console.log("Registration successful");
            navigate("/login")
        }
    }

    return (
        <>
        <section className='signup'>
            <div className='container mt-5'>
                <div className='signup-content'>
                    <div className='signup-form'>
                        <h2 className='form-title'>
                            Sign up
                        </h2>
                        <form method='POST' className='register-form' id='register-form'>
                            <div className='form-group'>
                                {/* <label htmlFor="name"> Account</label> */}
                                <input type="text" name='name' id='name' autoComplete='off' value={user.name} onChange={handleInputs} placeholder='Your Name'/>
                            </div>
                            <div className='form-group'>
                                {/* <label htmlFor="email"> Email</label> */}
                                <input type="text" name='email' id='email' autoComplete='off' value={user.email} onChange={handleInputs} placeholder='Your Email'/>
                            </div>
                            <div className='form-group'>
                                {/* <label htmlFor="phone"> Phone Number</label> */}
                                <input type="number" name='phone' id='phone' autoComplete='off' value={user.phone} onChange={handleInputs} placeholder='Your Phone Number'/>
                            </div>
                            <div className='form-group'>
                                {/* <label htmlFor="work"> Show</label> */}
                                <input type="text" name='work' id='work' autoComplete='off' value={user.work} onChange={handleInputs} placeholder='Your Profession'/>
                            </div>
                            <div className='form-group'>
                                {/* <label htmlFor="password"> Account</label> */}
                                <input type="password" name='password' id='password' autoComplete='off' value={user.password} onChange={handleInputs} placeholder='Your Password'/>
                            </div>
                            <div className='form-group'>
                                {/* <label htmlFor="password"> Account</label> */}
                                <input type="password" name='cpassword' id='cpassword' autoComplete='off' value={user.cpassword} onChange={handleInputs} placeholder='Your Confirm Password'/>
                            </div>
                            <div className='form-group form-button'>
                                <input type="submit" name='signup' id='signup' className='form-submit' value="register" onClick={PostData} />
                            </div>
                        </form>
                        <div className='signup-image'> 
                        <figure>
                            Sign Pic
                            </figure>
                            <NavLink to="/login" className="signup-iamge-link">I am already registered!</NavLink>
                            </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Signup