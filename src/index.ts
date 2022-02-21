import express,{ Application} from "express"
import session from "express-session"
import cookieParser from "cookie-parser"
import path from "path"
import passport from "passport"
import dotenv from "dotenv"
import {createConnection} from "typeorm"
import routes from './routes/pageRoutes'


createConnection().then(async connection => {

  const app: Application = express()
  dotenv.config({path:".env"})


    app.use(express.static(path.join(__dirname, "/public")))
    app.set("views", path.join(__dirname, "/views"))
    app.set("view engine", "ejs");
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.json());
    

    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
          maxAge: null,
      }
    }))

    app.use(passport.initialize())
    app.use(passport.session())
    
    

    app.use('/',routes)


    const port = process.env.PORT || 8000
    app.listen(port, () => {
      console.log(`🔥🔥🔥Server Running at ${port}🔥🔥🔥`)

})
})
