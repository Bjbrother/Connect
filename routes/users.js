const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

let User = require('../models/user');
let Article = require('../models/article');
const { ensureAuthenticated } = require('../config/auth');

router.get('/signup', (req, res) => {
	res.status(200).render('signup.pug');
});

router.post('/signup', (req, res) => {
	console.log(req.body);

	let userdata = {
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		bio: req.body.bio
	};

	// hash password
	bcrypt.genSalt(10, (err, salt) =>
		bcrypt.hash(userdata.password, salt, (err, hash) => {
			if (err) throw err;
			console.log(hash);
			console.log('Before', userdata.password);

			userdata.password = hash;

			console.log('Then', userdata.password);
			const userData = new User(userdata);
			console.log(userdata);

			userData
				.save()
				.then(() => {
					res.status(200).redirect('/users/signin');
				})
				.catch(() => {
					res.render('signup.pug', {
						error: 'Username already exists',
						name: userdata.name,
						username: userdata.username,
						password: userdata.password
					});
				});
		})
	);
});

router.get('/signin', (req, res) => {
	res.status(200).render('signin.pug');
});

router.post('/signin', passport.authenticate('local', { failureRedirect: '/users/signin' }), function(req, res) {
	res.redirect('/users/profile/' + req.user.username);
});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/users/signin');
});
router.get('/profile/:id', (req, res) => {
	const query = User.findOne({ username: req.params.id });
	const query2 = Article.find({ author: req.params.id });

	query.exec((err, usr) => {
		if (err) throw err;
		console.log(usr.username);
		query2.exec((error, article) => {
			if (error) throw error;
			console.log(article);
			let flag = 0;
			if (!req.user) {
				flag = 0;
			} else if (req.user.username == req.params.id) flag = 1;

			res.status(200).render('profile.pug', { usr, article, flag });
		});
	});
});

router.post('/:userid/article/:articleid', (req, res) => {
	let user_id = req.params.userid;
	let article_id = req.params.articleid;
	console.log(`working ${user_id} and ${article_id}`);
	User.findById(user_id, function(err, usr) {
		if (err) res.send(err);
		let found = usr.bookmarks.indexOf(article_id);
		console.log(found);
		if (found == -1) {
			usr.bookmarks.push(article_id);
			let query = { _id: usr.id };
			User.updateOne(query, usr, function(er) {
				if (er) {
					res.send(er);
				} else {
					res.send('success');
				}
			});
		} else {
			console.log('bookmark before', usr.bookmarks);
			usr.bookmarks.splice(found, 1);
			let query = { _id: usr.id };
			User.updateOne(query, usr, function(er) {
				if (er) {
					res.send(er);
				} else {
					res.send('success');
				}
			});
		}
	});
});

function getArticle(id) {
	return new Promise((resolve, reject) => {
		Article.findById(id, (err, article) => {
			if (err) {
				reject([]);
			} else {
				resolve(article);
			}
		});
	});
}

router.get('/readinglist', ensureAuthenticated, (req, res) => {
	console.log('Hi there in bookmarks');

	User.findById(req.user._id, async (err, usr) => {
		if (err) throw err;
		var arr = [];
		// res.send(usr.bookmarks);

		for (var id of usr.bookmarks) {
			const newArticle = await getArticle(id);
			console.log(newArticle);
			arr.push(newArticle);
		}
		res.render('home.pug', { article: arr });
	});
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
	const query = User.findOne({ username: req.params.id });
	query.exec((err, usr) => {
		if (err) throw err;
		if (req.user.username == req.params.id) res.status(200).render('edit.pug', { usr });
		else res.redirect('/users/profile/' + req.params.id);
	});
});

router.post('/edit/:id', ensureAuthenticated, (req, res) => {
	console.log(req.body);
	let user = {};
	user.name = req.body.name;
	user.bio = req.body.bio;
	const query = { username: req.params.id };

	User.updateOne(query, user, function(err) {
		if (err) throw err;
		res.redirect('/users/profile/' + req.params.id);
	});
});

module.exports = router;
