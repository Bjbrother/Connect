const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	heading: String,
	topic: String,
	story: String,
	author: String,
	likes: { type: Number, default: 0 },
	date: {
		type: Date,
		default: new Date()
	}
});

postSchema.virtual('timeElapsed').get(function() {
	// console.log(this.date);
	var d = this.date;
	let time = [
		d.getFullYear(),
		this.date.getMonth(),
		this.date.getDate(),
		this.date.getHours(),
		this.date.getMinutes()
	];
	let now = new Date();
	let dY = now.getFullYear() - time[0];
	let dM = now.getMonth() - time[1];
	let dD = now.getDate() - time[2];
	if (dY > 1) {
		return dY + ' year ago';
	} else if (dM > 0) {
		return dM + ' month ago';
	} else if (dD > 2) {
		return dD - 1 + ' day ago';
	} else {
		if (dD == 0) {
			let dH = now.getHours() - time[3];
			if (dH > 0) {
				return dH + ' hours ago';
			} else {
				let dM = now.getMinutes() - time[4];
				if (dM > 0) {
					return dM + ' minutes ago';
				} else {
					return 'just now';
				}
			}
		} else {
			return 'yesterday';
		}
	}
});

// compiling schema:
let Article = (module.exports = mongoose.model('Article', postSchema));
// });
