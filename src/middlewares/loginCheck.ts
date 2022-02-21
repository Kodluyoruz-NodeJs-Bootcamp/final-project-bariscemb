import { RequestHandler } from 'express';


export const loginCheck : RequestHandler =  (req, res, next) => {

  req.user? next() : res.redirect('/login');  

}

