const jwt = require('jsonwebtoken');
const {Admin} = require('../db');

let admin_secret_key = "ADMIN_SECERT_KEY";


let generate_admin_token = (admin_details)=>{
    let token = jwt.sign(admin_details, admin_secret_key, {expiresIn:'1h'});
    return token;
}


let authorize_admin = async(req, res, next)=>{
    let token = req.headers.authorization;
    if(token){
      token = token.split(' ')[1];
      jwt.verify(token, admin_secret_key, async(err, admin_details)=>{
        if(err) return res.status(404).send({message: "Token Invalid"});
        let isadminpresent = await Admin.findOne({username: admin_details.username, password: admin_details.password});
        if(isadminpresent){
          req.details = admin_details;
          next();
        }
        else{
          res.status(404).send({message: "Admin Not Found"});
        }
      })
    }
    else{
      res.status(404).send({message: "Token Unavailable"});
    }
}


module.exports = {
    generate_admin_token,
    authorize_admin
};
  

