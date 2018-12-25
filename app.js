"use script"

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/wp',(req,res,next)=>{
	const { FN , JIAM , USAJIAM } = require('./components/wp.js');

FN.getAll_blogPosts()
.then((data)=>{
	console.log(data.length)
	
	data.map((x,i)=>{
		//title, content, authorID, postingStatus
		console.log(`${i+1} : ${x.title.rendered}`);
		USAJIAM.createBlogPost(x.title.rendered,x.content.rendered)
		.then((response)=>{
		//console.log(response)
		res.json(response);
		})
		.catch((err)=>{
		//console.log(err)
		})
	}) 
})
.catch((err)=>{
	console.log(err);
})
})

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
