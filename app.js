var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var upload = require('express-fileupload');
var session = require('express-session');
const maxAgeSession = 1000*60*60;

var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var customerRouter = require('./routes/customer');

var app = express();
app.use(cors());


process.env.NODE_ENV = 'production';
//Serve static files in case of production
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('build'));
  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'build','index.html'))
  })
}

//Session Init

app.use(session({
  name: 'id',
  resave: false,
  saveUninitialized: false,
  secret: 'JJVDTDHPWI$%*##@@(&)SKUDJKS_SNDJHFQERAAVI\teja@2020',
  cookie: {
    maxAge: maxAgeSession,
    sameSite: true,
  } 
 }));
 var sess;
 const SessInit = (res,req,next)=>{
   sess = req.session
   sess.filename
   console.log(req.session)
   next()
 }

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/customer', customerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
