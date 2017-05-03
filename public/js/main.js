$(document).ready(() => {
	let previewField = $('.preview-content')[0];
  let editorInput = $('textarea.form-control')

  previewInput(editorInput, previewField);
});

function previewInput(input, preview) {
  input.keyup(function() {
		preview.innerHTML = this.value;
	});
}
