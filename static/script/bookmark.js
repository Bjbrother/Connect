$(document).ready(function() {
	$('.btn#bookmark').on('click', function(e) {
		$target = $(e.target);
		console.log($target.attr('data-id'));
		const id = $target.attr('data-id');
		const usr_id = $target.attr('data-user');
		console.log(`${id} and ${usr_id}`);
		$.ajax({
			type: 'POST',
			url: `/users/${usr_id}/article/${id}`,
			success: function(res) {
				alert('Article Bookmarked');
				$('#bookmark').html('Bookmarked');
			},
			error: function(err) {
				console.log(err);
			}
		});
	});
});

$(document).ready(function() {
	$('.btn#bookmarked').on('click', function(e) {
		$target = $(e.target);
		console.log($target.attr('data-id1'));
		const id = $target.attr('data-id1');
		const usr_id = $target.attr('data-user1');
		console.log(`${id} and ${usr_id}`);
		$.ajax({
			type: 'POST',
			url: `/users/${usr_id}/article/${id}`,
			success: function(res) {
				alert('Article Bookmark removed');
				$('#bookmarked').html('Bookmark');

				window.location.href = '/users/readinglist';
			},
			error: function(err) {
				console.log(err);
			}
		});
	});
});
