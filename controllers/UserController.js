import User from "../models/UserModel.js";

import * as shortid from "shortid";

import jwt from "jsonwebtoken"; 


export const homePage = (req, res) => {
  res.send("On / Page");
};

export const loginUser = async (req, res,next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    
    if (!user) {
      return response
        .status(401)
        .json({ error: "Invalid username or password" });
    }
    if ((await user).password != password) {
      return response
        .status(401)
        .json({ error: "Invalid username or password" });
    }

    shortid.characters(
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
    );
    const id = shortid.generate(); 
    // Token Generation
    const token = jwt.sign({ id }, 'secret', { expiresIn: '1h' });
    res.json({ token:token });
  } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error });
    }
};

// fetch user profile after validation
export const fetchUserProfile = async (req,res,next)=>{ 
  const {userId} = req.body; 
  try { 
    const user = await User.findOne({id:userId});
    if (!user) {
      return response
        .status(404)
        .json({ error: "User Not Found" });
    }
    return {
      status:200,
      message:"User Found",
      data:user
    }
  } catch (error) { 
    res.status(401).json({ error: 'Server Error' });
  }
}

// follow user
export const followUser = async (req,res,next)=>{
const {id} = req.params.id;
const {authUserId} = req.body;
try {
  const followUser = await User.find(id);
  if (!followUser) {
    return response
      .status(404)
      .json({ error: "User Not Found" });
  }
  const followingUser = await User.find({id:authUserId});
  if (!followingUser) {
    return response
      .status(404)
      .json({ error: "User Not Found" });
  }

  if((await followUser).followers==null){
    (await followUser).followers=[(await followingUser).username];
  }else{
    (await followUser).followers.push((await followingUser).username);
  }
  if((await followingUser).followings==null){
    (await followingUser).followings=[(await followUser).username];
  }else{
    (await followingUser).followings.push((await followUser).username);
  }
  const updatedfollowUser = await User.save(followUser);
  const updatedfollowingUser = await User.save(followingUser);
  
  return {
    status:200,
    message:"Followed",
    data:{
      followers:updatedfollowingUser.followers.length,
      followings:updatedfollowingUser.followings.length
    }
  }
} catch (error) {
  
  return res.status(500).json({ message: error.message });
}

}

// unfollow user
export const unfollowUser = async (req,res,next)=>{
  const {id} = req.params.id;
  const {authUserId} = req.body;
  try {
    const unfollowUser = await User.find(id);
    if (!unfollowUser) {
      return response
        .status(404)
        .json({ error: "User Not Found" });
    }
    const unfollowingUser = await User.find({id:authUserId});
    if (!unfollowingUser) {
      return response
        .status(404)
        .json({ error: "User Not Found" });
    }
    let follower = (await unfollowUser).followings;

    const index1 = follower.indexOf((await unfollowingUser).username);

    const x1 = follower.splice(index1, 1);
    
    const updatedunfollowUser = await User.save(unfollowUser);
  
    let following = (await unfollowingUser).followers;

    const index2 = following.indexOf((await unfollowUser).username);

    const x2 = following.splice(index2, 1);
    
    const updatedunfollowingUser = await User.save(unfollowingUser);
 
    const updatedfollowUser = await User.save(followUser);
    const updatedfollowingUser = await User.save(followingUser);
    
    return {
      status:200,
      message:"Unfollowed",
      data:{
        followers:updatedfollowingUser.followers.length,
        followings:updatedfollowingUser.followings.length
      }
    }
  } catch (error) {
    
    return res.status(500).json({ message: error.message });
  }
}

 

// Define middleware to verify token on protected routes
export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, 'secret');
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
}