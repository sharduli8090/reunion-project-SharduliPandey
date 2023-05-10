import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";


export const createPost = async (req,res,next)=>{
  const{userId,title,description} = req.body
  try {
    const user = await User.findOne({id:userId});
    if (!user) {
      return response
        .status(404)
        .json({ error: "User Not Found" });
    }
    
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);
const id = shortid.generate();
    const post = await Post.save({id,title,description});
    if(user.posts==null){
      user.posts = [post];
    }else{
      user.posts.push(post);
    }
    return {
      status:200,
      message:"Post Created",
      data:post
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

//delete post
export const deletePost = async (req,res,next)=>{
  const{id} = req.params.id;
  const {userId} = req.body;
  try {
    const user = await User.findOne({id:userId});
    if (!user) {
      return response
        .status(404)
        .json({ error: "User Not Found" });
    }

    const post = await Post.findOne(id);
    
    let posts = (await user).posts;

    const index = posts.indexOf(post);

    const x1 = posts.splice(index, 1);
    user.posts=posts;
    const updatedUser = await User.save(user);
    const deletedPost = await Post.remove(post);
    return {
      status:200,
      message:"Post Deleted",
      data:deletedPost
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// fetch all posts
export const fetchAllPosts = async (req, res,next) => {
try {
  const posts = await Post.find();
  if (!posts) {
    return response
      .status(404)
      .json({ error: "Posts Not Found" });
  }
  return {
    status:200,
    message:"Posts Found",
    data:posts
  }  
} catch (error) {
  return res.status(500).json({ message: error.message });
}
}

// fetch one posts
export const fetchPostDetails = async (req, res,next) => {
  const{id}= req.params.id;
try {
  const posts = await Post.findOne(id);
  if (!posts) {
    return response
      .status(404)
      .json({ error: "Posts Not Found" });
  }
  return {
    status:200,
    message:"Posts Found",
    data:{title:posts.title,description:posts.description,likes:posts.likes.length,comments:posts.comments.length,comments:posts.comments}
  }  
} catch (error) {
  return res.status(500).json({ message: error.message });
}
}


// like post
export const likePost = async (req, res,next) => {
  const {id} = req.params.id;
  const {userId} = req.body;
  try {
    const posts = await Post.findOne(id);
    if (!posts) {
      return response
        .status(404)
        .json({ error: "Posts Not Found" });
    }
    const user = await User.findOne({id:userId});
    if (!user) {
      return response
        .status(404)
        .json({ error: "User Not Found" });
    }

    if((await posts).likes==null){
      (await posts).likes=[(await user).username];
    }else{
      (await posts).likes.push((await user).username);
    }
    const updatePost = await Post.save(posts);
    
  return {
    status:200,
    message:"Post Liked",
    data:updatePost
  }  

  }  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// unlike post
export const unlikePost = async (req, res,next) => {
  const {id} = req.params.id;
  const {userId} = req.body;
  try {
    const posts = await Post.findOne(id);
    if (!posts) {
      return response
        .status(404)
        .json({ error: "Posts Not Found" });
    }
    const user = await User.findOne({id:userId});
    if (!user) {
      return response
        .status(404)
        .json({ error: "User Not Found" });
    }
 
    let likers = (await posts).likes;

    const index = likers.indexOf((await user).username);

    const x1 = likers.splice(index, 1);
    posts.likes=likers;
    
    const updatedPost = await Post.save(posts); 
    
  return {
    status:200,
    message:"Post unliked",
    data:updatedPost
  }  

  }  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// comment post
export const commentPost = async (req, res,next) => {
  const postId = req.params.id;
  const {userId,comment} = req.body;
  try {
    
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);
const id = shortid.generate();
const user = await User.findOne({id:userId});
if (!user) {
  return response
    .status(404)
    .json({ error: "User Not Found" });
}
const username = (await user).username;
    const comments = await Comment.save({id,username,comment});
    const post = await Post.findOne({id:postId});
    if(post.comments==null){
      post.comments=[comments];
    }else{
      post.comments.push(comments);
    }
    const updatedPost = await Post.save(post);
    return {
      status:200,
      message:"Commented on Post",
      data:updatedPost
    }  
  
    }  catch (error) {
      return res.status(500).json({ message: error.message });
    }
}
