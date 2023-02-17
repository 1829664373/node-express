var express = require('express');
var router = express.Router();
var connection = require('../myspl/index.js')
//导入生成token的包
const jwt = require('jsonwebtoken')
const token = require('../assets/encryption.js')
/* GET users listing. */
//登录
router.post('/login', function(req, res) {
  var spl = 'SELECT * FROM bank_account_number WHERE username = ?';
  connection.query(spl,[req.body.username],function(err, result){
    let result1 = JSON.parse(JSON.stringify(result[0]))
    if(result1){
      if(result1.password == req.body.password){
        //三个参数:  加密对象  解密字符串 有效时长
        delete result[0].password
        const tokenStr = jwt.sign(result[0],token.jwtSecretKey,{
          expiresIn: '10h', // token 有效期为 10 个小时
        })
        res.cc({
          token:'Bearer ' + tokenStr,
          id:result1.id,
          jurisdiction:result1.jurisdiction
        })
      }else{
        res.cc(100,'密码错误')
      }
    }else{
      res.cc(100,'账号错误')
    }
  })
});
module.exports = router;
