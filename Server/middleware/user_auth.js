const jwt = require('jsonwebtoken');
const {User} = require('../db');

let user_secret_key = "USER_SECERT_KEY";


let generate_user_token = (user_details)=>{
    let token = jwt.sign(user_details, user_secret_key, {expiresIn:'1h'});
    return token;
}


let authorize_user = async(req, res, next)=>{
    let token = req.headers.authorization;
    if(token){
      token = token.split(' ')[1];
      jwt.verify(token, user_secret_key, async(err, user_details)=>{
        if(err) return res.status(404).send({message: "Token Invalid"});
        let isuserpresent = await User.findOne({username: user_details.username, password: user_details.password});
        if(isuserpresent){
          req.details = user_details;
          next();
        }
        else{
          res.status(404).send({message: "User Not Found"});
        }
      })
    }
    else{
      res.status(404).send({message: "Token Unavailable"});
    }
}


module.exports = {
    generate_user_token,
    authorize_user
};