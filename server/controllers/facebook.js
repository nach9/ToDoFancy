var jwt = require('jsonwebtoken');
const Facebook = require('../models/facebook')
require('dotenv').config()

class FacebookCtrl{

  static login(req,res){
    console.log(req.body.accesstoken);
  Facebook.me(req.body.accesstoken)
  .then(response=>{
      const tokenjwt=jwt.sign({id:response.id,name:response.name,email:response.email,imgUrl:response.picture.data.url} ,process.env.JWT_SECRET )
      res.status(200).json({tokenjwt:tokenjwt})
  }).catch(err=>{
    res.status(500).json({err:err})
  })
  }
}

module.exports = FacebookCtrl;
