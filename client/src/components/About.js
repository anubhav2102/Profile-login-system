import React, {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom';

const About = () => {

    const navigate = useNavigate();

    const [userData,setUserData] = useState();

    const callAboutPage = async ()=>{
        try {
            const res = await fetch('/about',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
            const data = await res.json();
            console.log(data);
            setUserData(data);
            if(!res.status===200){
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate('/login')
        }
    }

    useEffect(() => {
        callAboutPage();
    }, []);
    
    return (
        <>
            <div className='container emp-profile'>
                <form method='GET'>
                    <div className='row'>
                        <div className='col-md-4'>
                            Photo
                        </div>
                        <div className='col-md-6'>
                            <div className='profile-head'>
                                <h5>{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                <p className='profile-rating mt-3 mb-5'>
                                    RANKINGS: <span> 1/10 </span>
                                </p>
                                <ul className='nav nav-tabs' role="tablist">
                                    <li className='nav-item'>
                                        <a href="#home" data-toggle="tab" id='home-tab' role="tab" className='nav-link active'>About</a>
                                    </li>
                                    <li className='nav-item'>
                                        <a href="#profile" data-toggle="tab" id='profile-tab' role="tab" className='nav-link'>Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <input type="submit" className='profile-edit-btn' name='btnAddMore' value="Edit Profile" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4 '>
                            <div className='profile-work'>
                                <p>Work Link</p>
                                <a href="https://www.instagram.com" target="_blank">Instagram</a> <br />
                                <a href="https://www.instagram.com" target="_blank">YouTube</a> <br />
                                <a href="https://www.instagram.com" target="_blank">Website</a> <br />
                                <a href="https://www.instagram.com" target="_blank">Figma</a>

                            </div>
                        </div>
                        <div className='col-md-8 pl-5 about-info'>
                            <div className='tab-content profile-tab' id='myTabContent'>
                                <div className='tab-pane fade show active' id='home' role="tabpanel" aria-labelledby='home-tab'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>User ID</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>9328777219</p>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-md-6'>
                                            <label>Name</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-md-6'>
                                            <label>Email</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-md-6'>
                                            <label>Phone</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-md-6'>
                                            <label>Profession</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData.work}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default About