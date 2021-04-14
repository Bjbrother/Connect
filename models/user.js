const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
	name: {
		type: String
	},
	username: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true
	},
	password: String,
	bio: String,
	bookmarks: [ mongoose.Schema.Types.ObjectId ]
});

// compiling schema:
let User = (module.exports = mongoose.model('User', userSchema));
// });

// Passport allows an option to store the user object in request instead of the session.
