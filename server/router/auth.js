const jwt = require('jsonwebtoken')
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const authenticate = require("../middleware/authenticate")

require('../db/conn')
const User = require("../model/userSchema")
const { rawListeners } = require('../model/userSchema')

router.get('/', (req,res)=>{
    res.send(`Hello world from the server`)
})

router.post('/register',async (req,res)=>{
    const {name, email, phone, work, password, cpassword} = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "fields incomplete"})
    }

    try {
        const userExist = await User.findOne({email: email});
        if(userExist) {
            return res.status(422).json({error: "email already exists"})
        }else if(password !== cpassword){
            return res.status(422).json({error: "password not matching"})
        }else{
            const user = new User({name, email, phone, work, password, cpassword})

        await user.save();
        res.status(201).json({message: "user registered succesfully"})
        }
    } catch (err) {
        console.log(err)
    } 
})

router.post('/signin', async (req,res)=>{
    // console.log(req.body);
    // res.json({message: "awesome"})
    try {
        let token;
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error: "Please fill the data"})
        }
        const userLogin = await User.findOne({email: email});
        
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password)
            token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken",token,{
                expires: new Date(Date.now()+25892000000),
                httpOnly: true
            });

        if(!isMatch) {
            res.status(400).json({error: "Invalid Credentials"})
        }else{
            res.json({message: "User Signin Successfully"})
        }
        }else{
            res.status(400).json({error: "Invalid Credentials"})
        }
        // console.log(userLogin);
        

    } catch (err) {
        console.log(err);
    }
})

router.get('/about',authenticate, (req,res)=>{
    res.send(req.rootUser)
})
router.get('/getData',authenticate, (req,res)=>{
    res.send(req.rootUser)
})

router.post('/contact', authenticate,async (req,res)=>{
    try {
        const {name,email,phone,message} = req.body;
        if(!name || !email || !phone || !message){
            console.log("Error");
            return res.json({error: "Plz fill the contact form"})
        }
        const userContact = await User.findOne({_id:req.userID});
        if(userContact) {
            const userMessage = await userContact.addMessage(name,email,phone,message);
            await userContact.save();
            res.status(201).json({message: "User contact successfully!"});
        }
    } catch (err) {
        console.log(err);
    }
})

router.get('/logout', (req,res)=>{
    console.log(`Hello my logout`);
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send('user logout');
})

module.exports = router