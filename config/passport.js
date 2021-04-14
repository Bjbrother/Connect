const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
module.exports = function(passport) {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'username'
			},
			(username, password, done) => {
				// match user
				User.findOne({ username: username })
					.then((usr) => {
						if (!usr) {
							return done(null, false, { message: "Username doesn't exist" });
						}

						// match password
						bcrypt.compare(password, usr.password, (err, isMatch) => {
							if (err) throw err;

							if (isMatch) {
								return done(null, usr);
							} else {
								return done(null, false, { message: 'Credentials are wrong' });
							}
						});
					})
					.catch((err) => console.log(err));
			}
		)
	);

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
};
