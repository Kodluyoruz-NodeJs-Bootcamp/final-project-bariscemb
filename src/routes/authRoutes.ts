import express from 'express'
import {postRegister,postLogin,getLogout} from '../controllers/authController'
import {getLogin,getRegister} from '../controllers/pageController'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import '../services/googleAuth'
import '../services/standartAuth'
import '../services/facebookAuth'

const app=express.Router()

app.get('/login',getLogin)
app.get('/register',getRegister)
app.get('/logout',getLogout)

app.post('/login',postLogin)
app.post('/register',postRegister)


app.get('/login/facebook',passport.authenticate('facebook',{scope: 'email'}))
app.get('/login/facebook/callback',passport.authenticate('facebook',{    
    failureRedirect:'/login',
    failureMessage: true
}),async(req,res)=>{    
    const payload={
        email:req.user['email']
    }
    const token= await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 7000 });        
    res.cookie("jwt", token, { httpOnly: true })
    res.redirect('/')
}) 



app.get('/login/jwt',passport.authenticate('jwt',{successRedirect:'/',failureRedirect:'/login'}))  
app.get('/login/google',passport.authenticate('google',{scope:['email','profile']}))
app.get('/login/google/callback',passport.authenticate('google',{ 
    failureRedirect:'/login',
    failureMessage: true
}),async(req,res)=>{
    const payload={
        email:req.user['email']
    }
    const token= await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 7000 });        
    res.cookie("jwt", token, { httpOnly: true })
    res.redirect('/')
})

   


const authRouter = app;
export default authRouter;



