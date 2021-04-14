const express = require('express');
const router = express.Router();

// Bring in Models

let Article = require('../models/article');

router.get('/', (req, res) => {
	res.status(200).render('index.pug');
});

router.get('/home', (req, res) => {
	// Article.find(function(err, users) {
	// 	if (err) {
	// 		res.send(err);
	// 	} else {
	// 		// console.log('All users returned' + users);

	// res.status(200).render('home.pug', {
	// 	article: users
	// });
	// // 	}
	// });
	var query = Article.find({});
	query.sort('-date').exec((err, article) => {
		res.status(200).render('home.pug', {
			article: article
		});
	});
});

router.get('/about', (req, res) => {
	res.status(200).render('about.pug');
});

module.exports = router;
