const express = require('express');
const app = express();
const path = require('path');
const port = 3200;
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
//Express releted
app.use('/static', express.static('static')); //serve static filescd aap
app.use(express.urlencoded());
require('./config/passport')(passport);

app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	})
);

app.use(passport.initialize());
app.use(passport.session());
// PUG releted stuff
// set template engine as pug
app.set('view engine', 'pug');
// set the view directory
app.set('views', path.join(__dirname, 'views'));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true }, { useUnifiedTopology: true });

// check for db connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Database connected..');
});
// END POINTS:
app.get('*', (req, res, next) => {
	console.log(req.user);
	res.locals.user = req.user || null;
	next();
});
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

let articles = require('./routes/articles');
require('./config/passport');
app.use('/article', articles);

// START SERVER

app.listen(port, () => {
	console.log(`app started at ${port}`);
});
