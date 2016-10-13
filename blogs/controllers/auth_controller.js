
function AuthController() {
	
}

AuthController.prototype.login = function(req, res) {
	res.render('auth/login', {
        user: req.user,
		title: 'Login',
		message: req.flash('loginMessage') 
	});
};

AuthController.prototype.signup = function(req, res) {
	res.render('auth/signup', {
        user: req.user,
		title: 'Sign Up',
		message: req.flash('signupMessage') 
	});
};

AuthController.prototype.profile = function(req, res) {
	res.render('auth/profile', {
		title: 'Profile', 
		user: req.user 
	});
};

AuthController.prototype.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

module.exports = new AuthController();
