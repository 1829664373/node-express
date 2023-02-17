var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const expressJWT = require('express-jwt')

const token = require('./assets/encryption.js')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tokenRouter = require('./routes/token.js')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next)=> {
  res.cc = (data,code=200,msg='success') => {
    res.send({
      code,
      message:msg,
      data
    })
  }
  next()
});

//凡是以api开头的接口都不需要解密 path里面写的是正则表达式
app.use('/front-end-management/users', usersRouter);//登录
app.use(expressJWT({ secret: token.jwtSecretKey }))
app.use('/front-end-management', indexRouter);
// app.use(expressJWT.expressjwt({ secret: token.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: [/^\/api\//]}))
app.use('/front-end-management/token', tokenRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.name);
  if (err.name === 'UnauthorizedError') return res.send({message:'身份认证失败！',code:100})
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
