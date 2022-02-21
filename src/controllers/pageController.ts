import { RequestHandler } from "express"
import {Movie} from '../entity/Movie'
import {Actor} from '../entity/Actor'
import {User} from "../entity/User"
import { userInfo } from "os"



export const home:RequestHandler = async(req,res)=>{   
   
    const user = req.cookies["jwt"]
    const movies=await Movie.find({shared:true})
    const actors=await Actor.find({shared:true}) 
    

    res.render("home", {
        title: "Home",        
        user,
        movies,
        comment:movies["comment"],
        actors,          
    })
}
export const movieSingle:RequestHandler = async(req,res)=>{   
   
    const movies=await Movie.find()
    const comment = await Movie.find["comments"]
   
    res.render("moviesingle", {
        title: "Moviesingle",        
        user:req.user,
        movies, 
        comment  
    })
}

export const getRegister :RequestHandler = (req,res): void => {    
    const user = req.cookies["jwt"]

    res.render("signup",{
        title: "Create Account",
        user
    })
}

export const getLogin :RequestHandler = (req,res): void => {
    const user = req.cookies["jwt"]
    res.render("login",{
        title:"Login", 
        user    
    })
}

export const getAccount : RequestHandler = async (req,res) => {

    res.render("profile", {
        title: "Account Management",
        user: req.user,
        
    })
}

export const postCreateMovie : RequestHandler = (req,res): void => {
    res.render("createMovie", {
        title: "Post Management",
        user:req.user
    })
}
export const postCreateActor : RequestHandler = (req,res): void => {
    res.render("createActor", {
        title: "Actor Management",
        user:req.user
    })
}