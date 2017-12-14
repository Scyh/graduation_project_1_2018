var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var svgCaptcha = require('svg-captcha');

// 连接数据库
var mongoose = require('./db.js');
var db = mongoose();
var User = require('./models/user.js');
var Article = require('./models/article.js');
var Comment = require('./models/comment.js');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// 解决跨域
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 验证用户接口
app.get('/api/checkUser', function(req, res, next) {
  User.checkUser({
    username: req.query.username,
    password: req.query.password
  }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      if ((data*1) >0) {
        // console.log("用户存在");
        res.send({
          status: 'success'
        })
      } else {
        // 用户不存在
        res.send({
          status: 'fail'
        })
      }
    }
  })
});

// 验证码
app.get('/api/captcha', function(req, res, next) {
  var captcha = svgCaptcha.create();
  req.cookies.captcha = captcha.text;
  res.send({
    code: captcha.data.toString(),
    text: captcha.text.toString()
  })
});

// 检查用户名唯一
app.get('/api/uniqueUserName', function(req, res, next) {
  User.uniqueUserName({username: req.query.username}, function(err, data) {
    if (err) {
      console.log(err)
    } else {
      if ((data*1) >0) {
        // 用户名存在
        res.send({
          status: 'fail',
        })
      } else {
        res.send({
          status: 'success'
        })
      }
    }
  })

})

// 用户注册接口
app.post('/api/regUser', function(req,res,next) {
    let newUser = new User({
      username: req.body.username,
      password: req.body.password
    })
    newUser.save(function(err, data) {
      if (err) {
        console.log(err)
      } else {
        res.send({
          status: 'success'
        })
      }
    });
})


// 获取部分文章接口
app.get('/api/getArticle', function(req, res, next) {
  Article.fetchPart({
    pageCount: req.query.pageCount
  }, function(err, article) {
    if (err) {
      console.log(err);
    } else {
      res.json(article);
    }
  })
});

// 初始化文章分页
app.get('/api/getPageCount', function(req, res, next) {
  Article.fetchCount(function(err, data) {
    if (err) {
      console.log(err)
    } else {
      res.json(data);
    }
  })
})


// 获取 article_detail 接口
app.get('/api/getArticleDetail', function(req, res, next) {
  Article.findById(req.query._id, function(err, article) {
    if (err) {
      console.log(err)
    } else {
      res.send({
        article: article
      })
    }
  })

})

// 获取 文章评论 接口
app.get('/api/getComment', function(req, res, next) {
  Comment.findById(req.query._id, function(err, data) {
    if (err) {
      console.log(err)
    } else {
      if (data == null) {
        console.log("没有评论");
        res.send({
          status: "noComment"
        })
      } else {
        res.json(data);
        // res.send({
        //   status: "hasComment",
        //   article_like: data.article_like,
        //   comment: data.article_comment
        // });  
      }
      
    }
  })
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000);
console.log('success listen…………');