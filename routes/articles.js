const express = require('express');
const router = express.Router();

// Bring in Article model
let Article = require('../models/article');
let User = require('../models/user');
const { ensureAuthenticated } = require('../config/auth');

router.get('/write', ensureAuthenticated, (req, res) => {
	res.status(200).render('write.pug');
});

router.post('/write', ensureAuthenticated, (req, res) => {
	console.log(req.body);
	let obj = {
		heading: req.body.heading,
		topic: req.body.topic,
		author: req.user.username,
		story: req.body.story
	};
	var Postdata = new Article(obj);
	console.log(Postdata);
	console.log(obj.author);
	Postdata.save(function(err) {
		if (err) {
			console.log(err);
			return;
		} else {
			res.redirect('/home');
		}
	});
});

router.get('/edit/:id', ensureAuthenticated, function(req, res) {
	Article.findById(req.params.id, function(err, article) {
		if (req.user.username != article.author) {
			res.redirect('/article/' + req.params.id);
		}
		res.render('edit_article.pug', {
			article: article
		});
	});
});

router.post('/edit/:id', ensureAuthenticated, (req, res) => {
	console.log(req.body);
	let article = {};
	article.heading = req.body.heading;
	article.author = req.user.username;
	article.topic = req.body.topic;
	article.story = req.body.story;

	let query = { _id: req.params.id };

	Article.updateOne(query, article, function(err) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/home');
		}
	});
});

router.delete('/:id', function(req, res) {
	if (!req.user._id) {
		res.status(500).send();
	}
	let query = { _id: req.params.id };

	Article.findById(req.params.id, function(err, article) {
		if (err) throw err;
		if (article.author != req.user.username) {
			res.status(500).send();
		} else {
			Article.remove(query, function(err) {
				if (err) {
					console.log(err);
				} else {
					res.send('success');
				}
			});
		}
	});
});

function isBookmarked(article_id, user_id) {
	return new Promise((resolve, reject) => {
		User.findById(user_id, (err, user) => {
			console.log(article_id, user_id);
			let found = user.bookmarks.indexOf(article_id);
			console.log(found);
			let flag;
			if (found == -1) {
				flag = 1;
			} else {
				flag = 0;
			}
			resolve(flag);
		});
	});
}

// Get a single article:

router.get('/:id', ensureAuthenticated, (req, res) => {
	Article.findById(req.params.id, async (err, article) => {
		let flag = await isBookmarked(req.params.id, req.user._id);

		console.log(flag);
		res.render('article.pug', {
			article: article,
			flag: flag
		});
	});
});

module.exports = router;
