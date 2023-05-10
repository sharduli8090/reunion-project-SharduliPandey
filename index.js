import express from "express";
import {  homePage,loginUser,fetchUserProfile,unfollowUser,followUser,verifyToken } from "./controllers/UserController.js";
import {fetchAllPosts,fetchPostDetails,commentPost,unlikePost,likePost,deletePost,createPost} from "./controllers/PostController.js";
import mongoose from "mongoose";

const app = express();

const uri =
  "mongodb+srv://sharduli8090:shardulisp8090@mycluster.eprnomb.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async()=> {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
    app.listen(8000, () => {
      console.log("Server running on 8000");
    });
  } catch (error) {
    console.log("Error While connecting " + error.message);
  }
}

connectDB();


app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get("/",homePage);

app.post("/api/authenticate",loginUser);

app.patch("/api/follow/:id",verifyToken,followUser);

app.post("/api/unfollow/:id",verifyToken,unfollowUser);

app.get("/api/user",verifyToken,fetchUserProfile);

app.post("/api/posts",verifyToken,createPost);

app.delete("/api/posts/:id",verifyToken,deletePost);

app.post("/api/like/:id",verifyToken,likePost);

app.post("/api/unlike/:id",verifyToken,unlikePost);

app.post("/api/comment/:id",verifyToken,commentPost);

app.get("/api/posts/:id",verifyToken,fetchPostDetails);

app.get("/api/all_posts",verifyToken,fetchAllPosts);

