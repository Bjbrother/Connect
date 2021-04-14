console.log('using es6 concept for creating posts');

class Post {
	constructor(title, author, time, story, topic) {
		this.title = title;
		this.topic = topic;
		this.author = author;
		this.story = story;
		this.time = time;
	}
	datePosted() {
		let now = new Date();
		let dY = now.getFullYear() - this.time[0];
		let dM = now.getMonth() - this.time[1];
		let dD = now.getDate() - this.time[2];
		if (dY > 1) {
			return dY + ' year ago';
		} else if (dM > 0) {
			return dM + ' month ago';
		} else if (dD > 2) {
			return dD - 1 + ' day ago';
		} else {
			if (dD == 0) {
				let dH = now.getHours() - this.time[3];
				if (dH > 0) {
					return dH + ' hours ago';
				} else {
					let dM = now.getMinutes() - this.time[4];
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
	}
}

showPosts();

class Display {
	add(post) {
		console.log('Adding to UI');

		let pots = localStorage.getItem('pots');

		if (pots == null) {
			potsobj = [];
		} else {
			potsobj = JSON.parse(pots);
		}

		potsobj.push(post);
		localStorage.setItem('pots', JSON.stringify(potsobj));
		showPosts();
		// console.log(cls);
		// console.log(potsobj);
		// let uistring = `
		//                   <div class="post-group">
		//                   <div class="title">${post.title}</div>
		//                   <h7><span class="Name">${post.author}</span>&nbsp;<i>in</i>
		//                   <strong class="Name">${post.topic}</strong></h7>
		//                   <span class="time">${post.datePosted()}</span>
		//                   <p class="stories">${post.story}</p>
		//                   <button class="btn">Like</button>
		//                   <button class="btn">Bookmark</button>
		//                   </div>
		//                 `;
		// cls.innerHTML += uistring;
		// localStorage.setItem('pot', JSON.stringify(cls));
		// console.log(cls);
	}
}

function showPosts() {
	let pots = localStorage.getItem('pots');
	if (pots == null) {
		potsobj = [];
	} else {
		potsobj = JSON.parse(pots);
	}

	let html = ``;
	potsobj.forEach(function(post) {
		html += `
    <div class="post-group">
    <div class="title">${post.title}</div>
    <h7><span class="Name">${post.author}</span>&nbsp;<i>in</i>
    <strong class="Name">${post.topic}</strong></h7>
    <span class="time">${post.datePosted()}</span>
    <p class="stories">${post.story}</p>
    <button class="btn">Like</button>
    <button class="btn">Bookmark</button>
    </div>
  `;
	});
	let cls = document.querySelector('.posts');
	cls.innerHTML = html;
}

let flg = localStorage.getItem('flag');
console.log(flg);
// console.log(object);
if (flg == '1') {
	let t = localStorage.getItem('time');
	console.log(typeof t);
	let title = localStorage.getItem('title');
	let topic = localStorage.getItem('topic');
	let author = localStorage.getItem('author');
	let story = localStorage.getItem('stories');
	console.log(title);
	let arr = JSON.parse(t);
	console.log(typeof arr);

	let post = new Post(title, author, arr, story, topic);
	console.log(post);
	// console.log(t.getFullYear);

	let display = new Display();
	display.add(post);
} else {
}
