var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user');

module.exports = function (passport) {
	
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	/**
	 * Create a new User on signup
	 */
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function (req, email, password, done) {
		User.findOne({
			'local.email': email
		}, function (err, user) {
			if (err) {
				return done(err);
			} else if (user) {
				return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
			} else {
				var newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.generateHash(password);
				newUser.save(function (err) {
					if (err) {
						throw err;
					}
					return done(null, newUser);
				});
			}
		});
	}));

	/**
	 * Fetch User on login
	 */
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function (req, email, password, done) {
		User.findOne({
			'local.email': email
		}, function (err, user) {
			if (err) {
				return done(err);
			} else if (!user) {
				return done(null, false, req.flash('loginMessage', 'No user found.'));
			} else if (!user.validPassword(password)) {
				return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
			}
			return done(null, user);
		});
	}));
};
