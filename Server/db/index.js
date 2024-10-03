
const mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

let courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});


const User = new mongoose.model('Users', userSchema);
const Admin = new mongoose.model('Admin', adminSchema);
const Course = new mongoose.model('Course', courseSchema);



module.exports = {
    User,
    Admin,
    Course
};