var FB = require('fb')
require('dotenv').config()


class Facebook {
  static me(accessToken) {
    return new Promise((resolve, reject)=>{
      var fb = new FB.Facebook({
        accessToken: accessToken,
        appId: process.env.APPID,
        appSecret: process.env.APPSECRET
      })
      fb.api('me',{fields:['id','name','email','picture.type(large)']}, function(response) {
        if (response && response.error) {
          if (response.error.code === 'ETIMEDOUT') {
            console.log('request timeout');
            reject('request timeout')
          } else {
            console.log('error', response.error);
            reject(response.error)
          }
        } else {
          resolve(response)
        }
      })
    })
  }



}

module.exports = Facebook;
