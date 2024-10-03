const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');


const app = express();


app.use(cors());
app.use(express.json());



app.use('/admin', adminRouter);
app.use('/user', userRouter);


// connect to MOngoDb
mongoose.connect('mongodb+srv://coderfromheart:OwZLyOldBwVqODg0@cluster0.42q9esz.mongodb.net/', {
    dbName: "Course_Selling"
})
.then(() => {
    console.log("Database Connection Successfull");
})
.catch((err) => {
    console.log("Database Connection Failed: ", err); 
}); 



app.listen(3000, ()=>{
    console.log('Server Running on Port 3000');
})
