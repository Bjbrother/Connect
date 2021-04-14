// console.log("validating-form");

erro = 1;

function validateHead() {
	let head = document.getElementById('heading');
	if (head.value.trim() == '' || head.value.length <= 2) {
		head.style.border = '2px solid red';
		erro &= 0;
	} else {
		erro = 1;
		head.style.border = '2x solid black';
	}
}

function validateTopic() {
	let topic = document.getElementById('topic');

	if (topic.value.trim() == '' || topic.value.length <= 2) {
		topic.style.border = '2px solid red';
		erro &= 0;
	} else {
		topic.style.border = '2px solid black';
		erro = 1;
	}
}

function validateStory() {
	let stor = document.getElementById('story');

	if (stor.value.trim() == '' || stor.value.length <= 5) {
		stor.style.border = '2px solid red';
		erro &= 0;
	} else {
		stor.style.border = '2px solid black';
		erro = 1;
	}
}
function ValidatePostsubmit() {
	validateHead();
	validateTopic();
	validateStory();

	// console.log(erro);
	if (erro == 1) {
		let date = [];
		let d = new Date();
		date.push(d.getFullYear());
		date.push(d.getMonth());
		date.push(d.getDate());
		date.push(d.getHours());
		date.push(d.getMinutes());
		console.log(date);
		localStorage.setItem('flag', 1);
		localStorage.setItem('title', document.getElementById('heading').value);
		localStorage.setItem('author', 'Nikunj Joshi');
		localStorage.setItem('time', JSON.stringify(date));
		localStorage.setItem('topic', document.getElementById('topic').value);
		localStorage.setItem('stories', document.getElementById('story').value);
	} else localStorage.setItem('flag', 0);
	if (erro != 1) {
		return false;
	} else {
		erro = 1;
		return true;
	}
}

function validationin() {
	let usr = document.getElementById('user').value.trim();
	let pss = document.getElementById('pass').value.trim();
	let usernameRegex = /^[a-zA-Z0-9\_]+$/;

	// validating username
	if (usernameRegex.test(usr)) {
	} else {
		return setErrormsg1('Username must contain only alphanumaric values and _');
	}
	if (usr == '') {
		return setErrormsg1("username can't be blank");
	} else if (usr.length <= 2) {
		return setErrormsg1("username length can't be less then three");
	} else {
		let spa = usr.includes(' ');
		if (spa == 1) {
			return setErrormsg1("username can't contain space in between");
		} else {
		}
	}

	//validating password:

	if (pss.length <= 3) {
		return setErrormsg1('password length should be greater than 3');
	}
}

function setErrormsg1(msg) {
	let x = document.getElementsByClassName('alert');
	for (let i = 0; i < x.length; i++) {
		x[i].style.display = 'block';
	}
	let erms = document.getElementById('errormsg1');
	erms.innerHTML = msg;

	return false;
}

function validationup() {
	console.log('hello');

	let alertt = document.getElementById('alertup');
	console.log(alertt.innerHTML);

	// alertt.style.display="none";
	let nam = document.getElementById('name').value.trim();
	let usr = document.getElementById('username').value.trim();
	let pss = document.getElementById('password').value.trim();
	let reps = document.getElementById('repassword').value.trim();
	// validating name
	let usernameRegex = /^[a-zA-Z0-9\_]+$/;

	// validating username
	if (usernameRegex.test(usr)) {
	} else {
		return setErrormsg('Username must contain only alphanumaric values and _');
	}
	if (nam == '') {
		return setErrormsg("name can't be blank");
	} else if (nam.length <= 2) {
		return setErrormsg('name should be minimum of 3 length.');
	} else {
	}

	// validating username
	if (usr == '') {
		return setErrormsg("username can't be blank");
	} else if (usr.length <= 2) {
		return setErrormsg("username length can't be less then three");
	} else {
		let spa = usr.includes(' ');
		if (spa == 1) {
			return setErrormsg("username can't contain space in between");
		} else {
		}
	}

	//validating password:

	if (pss.length <= 3) {
		return setErrormsg('password length should be greater than 3');
	}
	// validating re-pass;

	if (reps != pss) {
		return setErrormsg("password and repassword doesn't matches");
	}

	return true;
}

function setErrormsg(msg) {
	console.log('error');
	let x = document.getElementsByClassName('alert');
	for (let i = 0; i < x.length; i++) {
		x[i].style.display = 'block';
	}
	let erms = document.getElementById('errormsg');
	erms.innerHTML = msg;

	return false;
}
