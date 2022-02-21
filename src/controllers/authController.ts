import { RequestHandler } from "express"
import { check, validationResult } from "express-validator"
import {getRepository} from "typeorm"
import { User} from "../entity/User"
import { hash, compare } from "bcryptjs"
import * as jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { fail } from "assert"
dotenv.config({ path: ".env" });


export const postRegister : RequestHandler = async (req, res,next): Promise<void> => {

    /* try{
        await check("email", "Email is not valid").isEmail().run(req);
        await check("password", "Password must be at least 6 characters long").isLength({ min: 6 }).run(req)
        await check("confirmPassword", "Passwords do not match").equals(req.body.password).run(req)    

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
           return res.redirect("/register")
        }   */  
try{
        const { username, email, password} = req.body 
        const userValid= await User.findOne({email})

        if(userValid){
            return res.status(400).redirect("/register")
            
        }
        else{       

           const passwordHash = await hash(password,10)
           const user=new User()
           user.username=username
           user.email=email
           user.password=passwordHash                  

            await User.save(user)
            res.status(201).redirect("/")
        }    
    }catch(err) {
        if(err){
            res.send(err).json({status: fail})
            
            next()
         }
     } 
}

export const postLogin : RequestHandler = async (req, res,next):Promise<void> => {
    
    try{
        await check("email", "Email is not valid").isEmail().run(req);
        await check("password", "Password cannot be blank").isLength({min: 1}).run(req)
    
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.redirect("/login")
        }

        const { email, password } = req.body     

        const user = await getRepository(User).findOne({ email })
        
        if (!user){
            return res.redirect("/register")
        }    
        const checkPassword = await compare(password, user.password)   

        if (!checkPassword){
            return res.redirect("/login")
        }

        const payload = {
            id: user.id,
            email:user.email
        };
           
        const token= await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 });  
        
        res.cookie("jwt", token, { httpOnly: true })
   
        res.status(201).redirect("login/jwt")
        
    }catch(err) {
        if(err){
            
            res.sendStatus(404)
            next()
         }
     }   
}


export const getLogout :RequestHandler = (req, res): void => {  

   // res.cookie("jwt", "loggedout", { maxAge: 1 })    
    req.session.destroy(() => {    
        res.clearCookie('jwt');   
        res.clearCookie('connect.sid', { path: '/' });
        res.redirect("/")
    })

}



export const updatePassword :RequestHandler = async (req, res, next): Promise<void> => {
    try{
        await check("password", "Password must be at least 6 characters long").isLength({ min: 6 }).run(req)
        await check("confirmPassword", "Passwords do not match").equals(req.body.password).run(req)
        
        const errors = validationResult(req)

         if (!errors.isEmpty()) {
            return res.redirect("/profile")
        } 

        const {password} = await req.body
        const user_id=req.user['id'] 
  const passwordHash = await hash(password,10)
        await User.update(user_id, { password:passwordHash })


        res.redirect("/login")

        }catch(err) {
           if(err){
               console.log(err)
               res.sendStatus(404)
               next()
            }
        }    
}



