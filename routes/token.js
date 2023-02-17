var express = require('express');
var router = express.Router();
var connection = require('../myspl/index.js')
//导入生成token的包
const jwt = require('jsonwebtoken')
const token = require('../assets/encryption.js')
router.get('/info', function(req, res) {
    console.log(req);
//   connection.query(spl,[req.body.username],function(err, result){
//     let result1 = result[0]
//     console.log(result1,req.body);
//     if(result1){
//       if(result1.password == req.body.password){
//         res.cc({
//           token:result1.token,
//           id:result1.id,
//           jurisdiction:result1.jurisdiction
//         })
//       }else{
//         res.cc(100,'密码错误')
//       }
//     }else{
//       res.cc(100,'账号错误')
//     }
//   })
  res.cc(req.query)
});
module.exports = router;