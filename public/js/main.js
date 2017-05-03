$(document).ready(() => {
	let preview = $('.preview-content')[0];
  // Update text into preview window in realtime
	$('textarea.form-control').keyup(function() {
		preview.innerHTML = this.value;
	});
});
