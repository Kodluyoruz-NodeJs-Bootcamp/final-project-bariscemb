import express from 'express'
import {home,getAccount,postCreateMovie,postCreateActor,movieSingle} from '../controllers/pageController'
import {updatePassword} from '../controllers/authController'
import {createMovie,createActor,showPosts,movieComment,actorComment,movieLike,actorLike,deleteMovie,deleteActor,updateMovie,updateActor} from '../controllers/postController'
import {loginCheck} from '../middlewares/loginCheck'
import authRouter from './authRoutes';

const app=express.Router()

app.get('/',home)
app.use('/',authRouter)

app.get('/profile',loginCheck,getAccount)
app.get('/createMovie',loginCheck,postCreateMovie)
app.get('/createActor',loginCheck,postCreateActor)
app.get('/movieSingle',loginCheck,movieSingle)

app.post('/password',loginCheck,updatePassword)

app.get('/myposts',loginCheck,showPosts)
app.post('/myposts/updatemovie/:id',updateMovie)
app.post('/myposts/updateactor/:id',updateActor)
app.post('/myposts/deletemovie/:id',deleteMovie)
app.post('/myposts/deleteactor/:id',deleteActor)

app.post('/createActor',loginCheck,createActor)
app.post('/createMovie',loginCheck,createMovie)

app.post('/movies/comment/:id',loginCheck,movieComment)
app.post('/movies/likes/:id',loginCheck,movieLike)

app.post('/actors/comment/:id',loginCheck,actorComment)
app.post('/actors/likes/:id',loginCheck,actorLike)



export default app;