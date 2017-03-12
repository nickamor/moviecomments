var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');

var credentials = require('../config/credentials');

const blogController = require('../controllers/blog_controller.js');
const authController = require('../controllers/auth_controller');

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
router.get('/',  	blogController.home);

/* GET movie details */
router.get('/movie/:movieId', blogController.movie);

/* POST new comment */
router.post('/movie/:movieId/comments', requireAuth, blogController.newComment);

router.get('/search', blogController.search);

/** auth routes **/

router.get('/login', requireUnauth, authController.login);

router.get('/signup', requireUnauth, authController.signup);

router.get('/profile', requireAuth, authController.profile);

router.get('/logout', requireAuth, authController.logout);

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
	req.flash('loginMessage', 'You need to be logged in to do that.');
	res.redirect('/login');
}

function requireUnauth(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/profile');
}
