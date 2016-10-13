var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');

var credentials = require('../config/credentials');

const blogController = require('../controllers/blog_controller.js');

// Prevent database connection errors for long-running applications.
var opts = {
	server: {
		socketOptions: {
			keepAlive: 1
		}
	}
};

mongoose.connect(credentials.mongo.devel.connection, opts);

/* GET home page. */
router.get('/', function(req, res, next) {
  blogController.home(req, res, next);
});

/* GET movie details */
router.get('/movie/:movieId', function (req, res, next) {
  blogController.movie(req, res, next);
});

/* POST new comment */
router.post('/movie/:movieId/comments', function (req, res, next) {
  blogController.newComment(req, res, next);
});

/** auth routes **/

router.get('/login', function(req, res, next) {
	res.render('auth/login', { message: req.flash('loginMessage') });
});

router.get('/signup', function(req, res, next) {
	res.render('auth/signup', { message: req.flash('signupMessage') });
});

router.get('/profile', requireAuth, function(req, res) {
	res.render('auth/profile', { user: req.user });
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true
}));

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true
}));

module.exports = router;

function requireAuth(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}
