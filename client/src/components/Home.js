import React,{useState,useEffect} from 'react'

const Home = () => {

    const [userName,setUserName] = useState('');

    const userHome = async ()=>{
        try {
            const res = await fetch('/getData',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
            });
            const data = await res.json();
            console.log(data);
            setUserName(data.name);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        userHome();
    }, []);

    return (
        <>
            <div className='home-page'>
                <div className='home-div'>
                    <p className='pt-5'>WELCOME</p>
                    <h1>{userName}</h1>
                    <h1>We are the MERN Developer</h1>
                </div>
            </div>
        </>
    )
}

export default Home