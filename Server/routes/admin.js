const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const {User, Admin, Course} = require('../db');
const {authorize_admin} = require('../middleware/admin_auth');
const {generate_admin_token} = require('../middleware/admin_auth');

const router = express.Router();


router.get("/me", authorize_admin, async (req, res)=>{
    return res.json(req.details)
});


router.post('/signup', async (req, res)=>{
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({message: 'Please enter both username and password'});
    }
    const existingAdmin = await Admin.findOne({username});
    if(existingAdmin) {
        return res.status(400).json({message: 'Username already exists'});
    }

    let new_admin = new Admin({username, password});
    await new_admin.save();
  
    let token = generate_admin_token({username, password});
    res.status(200).send({message: "Admin Created Successfully", token: token});
})


router.post('/signin', async (req, res)=>{
    const {username, password} = req.body;
    const admin = await Admin.findOne({username, password});
    if(!admin) {
        return res.status(400).json({message: 'Invalid username or password'});
    }
    let token = generate_admin_token({username, password});
    res.status(200).send({message: "Admin Signed In Successfully", token: token});
})


router.post('/courses', authorize_admin, async (req, res) => {
    let details = req.body;
    if(details){
      let new_course = new Course(details);
      await new_course.save();
  
      res.status(200).send({message:"Course Added Successfully", courseId: new_course.id});
    }
    else{
      res.status(404).send({message: "Provide Details For Course"});
    }
});


router.put('/courses/:courseId', authorize_admin, async (req, res) => {
    let courseId = req.params.courseId;
    let details = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).send({ message: "Invalid Course ID" });
    }
  
    let update = await Course.findByIdAndUpdate(courseId, details, {new: true});
  
    if(update){
      res.json({ message: 'Course updated successfully' });
    }
  
    else{
      res.status(404).send({message: "Course Not Found"});
    }
});


router.get('/courses', authorize_admin, async (req, res) => {
    let courses = await Course.find({});
  
    res.status(200).send({courses});
});


module.exports = router;