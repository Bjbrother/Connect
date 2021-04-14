// Access control
module.exports = {
	ensureAuthenticated: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/users/signin');
		}
	}
};
