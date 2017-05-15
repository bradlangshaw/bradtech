let express = require('express');
let router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' });


// reference Game model for CRUD
let Article = require('../models/article');

// auth
let passport = require('passport');

function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next();  // user has logged in already so continue to the next function
   }
   res.redirect('/login');
}

/* GET games index page */
router.get('/', function(req, res, next) {

   // use the model to query the games collection in mongodb
   Article.find(function(err, articles) {
      if (err) {
         console.log(err);
         res.end(err);
         return;
      }
      // load the view and pass the games data to it
      // console.log(games);
      res.render('articles/index', {
         articles: articles,
         title: 'Article Library',
          user: req.user
      });
   });
});

// GET /games/add - show the empty form
router.get('/add', isLoggedIn, function(req, res, next) {
   res.render('articles/add', {
      title: 'Add a New Article',
       user: req.user
   });
});
// POST /articless/add - process form submission
router.post('/add', upload.single('imagesrc'), isLoggedIn, function(req, res, next) {
   // use our Game model to add a new Game document to mongodb
   if (typeof req.file == 'undefined'){
   Article.create({
      title: req.body.title,
      date: req.body.date,
      author: req.body.author,
      description: req.body.description,
      body: req.body.body,
      mediasrc: req.body.mediasrc
   },function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      // no error so show updated games list
      res.redirect('/articles');
   });} else{
   Article.create({
      title: req.body.title,
      date: req.body.date,
      author: req.body.author,
      description: req.body.description,
      body: req.body.body,
      imagesrc: req.file.filename,
      mediasrc: req.body.mediasrc
   },function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
     res.redirect('/articles');
   });
   }
});

// GET /games/delete/_id - delete the selected game
router.get('/delete/:_id', isLoggedIn, function(req, res, next) {
   // delete game and redirect
   

   Article.remove({ _id: req.params._id }, function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      // no error so show updated games list
      res.redirect('/articles');
   });
   
});

// GET /articles/_id - show edit form
router.get('/:_id', function(req, res, next) {
   // look up the selected game
   Article.findById(req.params._id, function(err, article) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.render('articles/edit', {
         article: article,
         title: article.title +'- Article',
          user: req.user
      });
   });
});

// POST /articles/_id - save updates
router.post('/:_id', upload.single('imagesrc'), isLoggedIn, function(req, res, next) {
   // create an fill a
          
    if (typeof req.file == 'undefined'){
      let article = new Article({
      _id: req.params._id,
      title: req.body.title,
      date: req.body.date,
      author: req.body.author,
      description: req.body.description,
      body: req.body.body,
      mediasrc: req.body.mediasrc
   });
      // call Mongoose's Update method, passing the id and the updated game object
   Article.update({ _id: req.params._id}, article, function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.redirect('/articles');
   });
}   else{
       let article = new Article({
      _id: req.params._id,
      title: req.body.title,
      date: req.body.date,
      author: req.body.author,
      description: req.body.description,
      body: req.body.body,
      imagesrc: req.file.filename,
      mediasrc: req.body.mediasrc
   });
      // call Mongoose's Update method, passing the id and the updated game object
   Article.update({ _id: req.params._id}, article, function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.redirect('/articles');
   });
     }
});

// make public
module.exports = router;