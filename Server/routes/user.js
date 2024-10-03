const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const {User, Admin, Course} = require('../db');
const {authorize_user} = require('../middleware/user_auth');
const {generate_user_token} = require('../middleware/user_auth');


const router = express.Router();


router.get("/me", authorize_user, async (req, res)=>{
    return res.json(req.details)
});


router.post('/signup', async(req, res) => {
    let {username, password} = req.body;
    if(username.length == 0 || password.length == 0){
      return res.status(404).send({message: "Invalid Syntax For Username Or Password"});
    }
  
    let isuserpresent = await User.findOne({username});
  
    if(isuserpresent){
      return res.status(404).send({message: "User Already Present"});
    }
  
    let new_user = new User({username, password, purchasedCourse: []});
    await new_user.save();
  
    let token = generate_user_token({username, password});
    res.status(200).send({message: "User Created Successfully", token: token});
});
  

router.post('/signin', async (req, res) => {
    let {username, password} = req.body;
  
    let isuserpresent = await User.findOne({username, password});
  
    if(isuserpresent){
      let token = generate_user_token({username, password});
      res.status(200).send({message: "User Logged In Successfully", token: token});
    }
  
    else{
      res.status(404).send({message: "User Not Found"});
    }
});
  

router.get('/courses', authorize_user, async (req, res) => {
    let courses = await Course.find({published: true});
  
    res.status(200).send({courses});
});
  

router.post('/courses/:courseId', authorize_user, async (req, res) => {
    let courseId = req.params.courseId;
  
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).send({ message: "Invalid Course ID" });
    }
  
    let course = await Course.find({_id: courseId});
  
    if(course){
      let user = await User.findOne({username: req.details.username, password: req.details.password});
  
      let iscoursepresent = user.purchasedCourse.find(item=>item._id == courseId);
  
      if(iscoursepresent){
        return res.status(404).send({message: "Course ALready Purchased"});
      }
  
      user.purchasedCourse.push(course);
      await user.save();
  
      res.status(200).send({message: "Course Purchased Successfully"});
    }
  
    else{
      return res.status(404).send({message: "Course Not Found"});
    }
  
});
  

router.get('/purchasedCourses', authorize_user, async (req, res) => {
    let user = await User.findOne({username: req.details.username, password: req.details.password});
    let purchaseId = user.purchasedCourse;
    let purchasedCourse = [];
    for(let i=0; i<purchaseId.length; i++){
      let course = await Course.find({_id: purchaseId[i]});
      purchasedCourse.push(course[0]);
    }
  
    res.status(200).send({purchasedCourse})
});


module.exports = router;