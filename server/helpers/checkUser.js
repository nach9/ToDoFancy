var jwt = require('jsonwebtoken');
require('dotenv').config()

function checkUser(req,res,next){

  jwt.verify(req.headers.tokenjwt, process.env.JWT_SECRET , function(err, decoded) {
    if(err){
      res.json(501,{msg:'please login'})
    }
    else{
      // if(decoded.userID==req.params.id){
      console.log('user ok');
        next()
      // }
      // else{
      //   res.json(200,{msg:'not same user'})
      // }
    }
  });
}

module.exports = checkUser;
