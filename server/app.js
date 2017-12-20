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
      password: req.body.password,
      // sex: 'female',
      // job: '',
      // industry: '',
      // birthday: '',
      // introduce: '个人简介'
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

// 获取用户信息
app.get('/api/getUserInfo', function(req, res, next) {
  console.log(req.query.username)
  User.findByUserName({username: req.query.username},function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  })
})
// 更新用户头像
app.post('/api/updateUserProfile', function (req, res, next) {
  User.update({'username': req.body.username}, {"userProfile": req.body.srcStr}, function(err, data) {
     if (err) {
      console.log(err);
      res.send({
        status: 'fail'
      })
     } else {
      res.send({
        status: 'success'
      })
     }
  })
})

// 更新用户信息
app.post('/api/updateUserInfo',function (req, res, next) {
  User.update({username:req.body.username}, {
      sex: req.body.sex,
      trueName: req.body.trueName,
      industry: req.body.industry,
      job: req.body.job,
      introduce: req.body.introduce,
      birthday: req.body.birthday
    }, function (err) {
      if (err) {
        console.log (err);
        res.send({
          status: 'fail'
        })
      } else {
        res.send({
          status: 'success'
        })
      }
    })
})

// 获取用户tab信息
app.get('/api/getTabInfo', function (req, res, next) {
  
})

// 获取主页文章中的部分文章
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
  Comment.fetchComment(req.query._id, function(err, data) {
    if (err) {
      console.log(err)
    } else {
      
      if (data.length == 0) {
        // console.log("没有评论");
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

// 回复评论  如果数据库中没有该文章的评论 document ，就新建一张
app.post('/api/reply', function (req, res, next) {
  Comment.count({'_article_id': req.body._article_id})
    .then(data => {
    // 数据库中没有该文章的记录,则新建
    if (data < 1) {
      let newComment = new Comment({
        _article_id: req.body._article_id
      })
      newComment.save((err, data) => {
        if (err) {
          console.log(err)
        }
      });      
    }

    let article_comment = {
      'comment_author': req.body.comment_author,
      'comment_date': req.body.comment_date,
      'comment_content': req.body.comment_content
    }
    Comment.addComment({
      _article_id: req.body._article_id,
      reply:article_comment
    }, function (err, data) {
      if (err) {
        console.log(err)
        res.send({
          status: 'fail'
        })
      } else if (data.n == 1 && data.nModified == 1){
        res.send({
          status: 'success'
        })
      } 
    })
  }).catch(err => {
    console.log(err)
  })
});

// 删除评论
app.post('/api/deleteComment', function (req, res, next) {
  Comment.deleteComment({
    _article_id: req.body._article_id,
    comment_date: req.body.comment_date,
    comment_content: req.body.comment_content
  }).then(data => {
    res.send({
      status: 'success'
    })
  }).catch(err => {
    console.log(err);
    res.send({
      status: 'fail'
    })
  })
}) 

// 点赞或踩
app.post('/api/likeOrNot', function (req, res, next) {
  // 没有评论只有点赞的时候，需新建comment






  Comment.updateLikeOrNot({
    _article_id: req.body._article_id,
    type: req.body.type,
    count: req.body.count,
    user: req.body.user
  }, (err, data) => {
    if (data.n ==1 && data.nModified == 1) {
      res.send({
        status: 'success'
      })
    }
  })
})


// 初始化个人主页的文章tab
app.get('/api/getMyArticles', function (req, res, next) {
  Article.fetchByAuthor(req.query.username, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      res.send(data);
    }
  })
})

// 获取查看文章
app.get('/api/getOneArticle', function (req, res, next) {
  Article.findById(req.query.article_id).then(data => {
    res.json(data);
  }).catch(err => {
    console.log(err)
  })
})

// 删除文章
app.post('/api/deleteArticle', function (req, res, next) {
  Article.deleteOne(req.body._id)
    .then(data => {
      // console.log(data)
      res.send({
        status: 'success'
      })
  }).catch(err => {
      console.log(err)
      res.send({
        status: 'fail'
      })
  })
})

// 初始化 个人信息tab
app.get('/api/getMyNotice', function (req, res, next) {

})

// test 
app.get('/api/test', function (req, res, next) {
  // Article.find({'article_author': 'shen'}, 'article_title', function (err, data) {
  //   if (err) {
  //     console.log(err)
  //   }
  //   console.log(data)
  // })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000);
console.log('success listen…………');