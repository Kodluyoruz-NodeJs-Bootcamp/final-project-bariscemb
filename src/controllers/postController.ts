import { RequestHandler } from "express";
import { Movie } from "../entity/Movie";
import { Actor } from "../entity/Actor";
import { User } from "../entity/User";



export const createMovie: RequestHandler = async (req, res, next) => {
  try {
    const id = req.user["id"];
    const username = req.user["username"];
    const { title, description, photo, shared } = req.body;
    if (!title) {
      res.redirect("/createMovie");
    }
    if (!description) {
      description === "No description";
    }

    const movie = await new Movie();
    movie.user_id = id;
    movie.title = title.toUpperCase();
    movie.description = description;
    movie.comments = [];
    movie.like = 0;
    movie.creator = username;

    if (shared == "true") {
      movie.shared = true;
    } else {
      movie.shared = false;
    }

    
      movie.photo = photo;
    

    await Movie.save(movie);
  
    res.status(200).redirect("/myposts");
    
  } catch (err) {
    if (err) {
      next();
    }
  }
};

export const updateMovie: RequestHandler = async (req, res, next) => {
  try {
    const { shared } = req.body;

    if (shared == "true") {
      await Movie.update(req.params.id, { shared: true });
    } else {
      await Movie.update(req.params.id, { shared: false });
    }

    res.redirect("/myposts");
  } catch (err) {
    if (err) {
      next();
    }
  }
};

export const deleteMovie: RequestHandler = async (req, res, next) => {
  try {
    await Movie.delete(req.params.id);
    console.log("movie deleted!")
    res.redirect("/myposts");
  } catch (err) {
    if (err) {
      next();
    }
  }
};

export const createActor: RequestHandler = async (req, res, next) => {
  try {
    const id = req.user["id"];
    const username = req.user["username"];
    const { name, biography, photo, shared } = req.body;
    if (!name) {
      res.redirect("/createActor");
    }
    if (!biography) {
      biography === "No biography";
    }

    const actor = new Actor();
    actor.user_id = id;
    actor.name = name.toUpperCase();
    actor.biography = biography;
    actor.comments = [];
    actor.like = 0;
    actor.creator = username;

    if (shared == "true") {
      actor.shared = true;
    } else {
      actor.shared = false;
    }

    
      actor.photo = photo;
    

    await Actor.save(actor);
  
    
    res.status(200).redirect("/myposts")
  } catch (err) {
    if (err) {
      next();
    }
  }
};


export const updateActor: RequestHandler = async (req, res, next) => {
  try {
    const { shared } = req.body;
console.log(shared)
    if (shared == "true") {
      await Actor.update(req.params.id, { shared: true});
    } else {
      await Actor.update(req.params.id, { shared: false});
    }

    res.redirect("/myposts");
  } catch (err) {
    if (err) {
      next();
    }
  }
};

export const deleteActor: RequestHandler = async (req, res, next) => {
  try {
    await Actor.delete(req.params.id);
    console.log("actor deleted!")

    res.redirect("/myposts");
  } catch (err) {
    if (err) {
      next();
    }
  }
};

export const showPosts: RequestHandler = async (req, res) => {
  const user_id = req.user["id"];

  const movies = await Movie.find({ user_id: user_id });
  const actors = await Actor.find({ user_id: user_id });
  
 
  res.render("myposts",{
    movies,
    actors,
    user: req.user,
  }); 


};

export const actorLike: RequestHandler = async (req, res) => {
  try {
    const user_id = req.user["id"];

    const actor = await Actor.findOne(req.params.id);

  actor.like +=1
   

    await Actor.update(req.params.id, { like: actor.like });
    
    res.redirect("/");
  } catch (err) {
    res.redirect("/");
  }
};

export const actorComment: RequestHandler = async (req, res) => {
  try {
    const user_id = req.user["id"];
    const comment = req.body.comment.trim();
    const commentAuthor = req.body.commentAuthor.trim();


    const actor = await Actor.findOne(req.params.id);
    const user = await User.findOne({ id: user_id });


    const commentRepo=await JSON.stringify(comment)
    const commentAuthorRepo=await JSON.stringify(commentAuthor)

    
    actor.comments.push(commentRepo);
    actor.commentAuthors.push(commentAuthorRepo);


    await Actor.update(req.params.id, { comments: actor.comments });
    await Actor.update(req.params.id, { commentAuthors: actor.commentAuthors });

    res.redirect("/");
  } catch (err) {
    if (err) {
     
      res.redirect("/");
    }
  }
};

export const movieLike: RequestHandler = async (req, res) => {
  try {
    const user_id = req.user["id"];

    const movie = await Movie.findOne(req.params.id);

  movie.like+=1
   

    await Movie.update(req.params.id, { like: movie.like });
    
    res.redirect("/");
  } catch (err) {
    res.redirect("/");
  }
};

export const movieComment: RequestHandler = async (req, res) => {
  try {
    const user_id = req.user["id"];
    const comment = req.body.comment.trim();
    const commentAuthor = req.body.commentAuthor.trim();
 
    const movie = await Movie.findOne(req.params.id);
    const user = await User.findOne({ id: user_id });
   
    
    const commentRepo=await JSON.stringify(comment)
    const commentAuthorRepo=await JSON.stringify(commentAuthor)


    movie.comments.push(commentRepo);
    movie.commentAuthors.push(commentAuthorRepo);
   

    await Movie.update(req.params.id, { comments: movie.comments });
    await Movie.update(req.params.id, { commentAuthors: movie.commentAuthors });

    res.redirect("/");
  } catch (err) {
    if (err) {
      res.redirect("/");
    }
  }
};
