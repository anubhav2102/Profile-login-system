import React, {useEffect,useState} from 'react'

const Contact = () => {

    const [userData,setUserData] = useState({name:"",email:"",phone:"",message:""});

    const userContact = async ()=>{
        try {
            const res = await fetch('/getData',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
            });
            const data = await res.json();
            console.log(data);
            setUserData({...userData,name: userData.name,email: userData.email,phone: userData.phone});
            if(!res.status===200){
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userContact();
    }, []);

    const handleInputs = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setUserData({...userData,[name]:value})
    }

    const contactForm = async(e)=>{
        e.preventDefault();
        const {name,email,phone,message} = userData;
        const res = await fetch('/contact',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name,email,phone,message
            })
        })
        const data = await res.json();
        if(!data){
            console.log("Message not send");
        }else{
            alert("Message sent")
            setUserData({...userData,message:""})
        }
    }

    return (
        <>
            <div className='contact_info'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-10 offset-lg-1 d-flex justify-content-between'>
                            <div className='contact-info-item d-flex justify-content-start align-items-center'>
                                
                                <div className='contact-info-content'>
                                    <div className='contact-info-title'>
                                        Phone
                                    </div>
                                    <div className='contact-info-text'>
                                        +91 9328 777 219
                                    </div>
                                </div>
                            </div>
                            <div className='contact-info-item d-flex justify-content-start align-items-center'>
                                
                                <div className='contact-info-content'>
                                    <div className='contact-info-title'>
                                        Email
                                    </div>
                                    <div className='contact-info-text'>
                                        anubhavladha11@gmail.com
                                    </div>
                                </div>
                            </div>
                            <div className='contact-info-item d-flex justify-content-start align-items-center'>
                                
                                <div className='contact-info-content'>
                                    <div className='contact-info-title'>
                                        Address
                                    </div>
                                    <div className='contact-info-text'>
                                        T-4, GF/4, RBG Complex, Karelibaug, Vadodara.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='contact-form'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-10 offset-lg-1'>
                            <div className='contact-form-container py-5'>
                                <div className='contact-form-title'>
                                    Get in touch
                                </div>
                                <form method='POST' id='contact_form'>
                                    <div className='contact_form_name d-flex justify-content-between align-items-between'>
                                        <input type="text" id='contact_form_name'
                                        className='contact_form_name input_field' name='name'
                                        placeholder="My Name" value={userData.name} onChange={handleInputs} required="true"/>
                                        <input type="email" id='contact_form_email'
                                        className='contact_form_email input_field' name='email'
                                        placeholder="My Email" value={userData.email} onChange={handleInputs} required="true"/>
                                        <input type="number" id='contact_form_phone'
                                        className='contact_form_phone input_field' name='phone'
                                        placeholder="My Phone Number" value={userData.phone} onChange={handleInputs} required="true"/>
                                    </div>
                                    <div className='contact_form_text mt-5'>
                                        <textarea className="text_field contact_form_message" cols="30" rows="10" name='message' value={userData.message} onChange={handleInputs} placeholder='Message'></textarea>
                                    </div>
                                    <div className='contact_form_button'>
                                        <button type='submit' className='button contact_submit_button' onClick={contactForm}>Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact