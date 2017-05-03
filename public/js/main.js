$(document).ready(() => {
	let previewField = $('.preview-content')[0];
  let editorInput = $('textarea.form-control')

  updateInput(editorInput, previewField);
});

function updateInput(input, preview) {
  input.keyup(function() {
		preview.innerHTML = this.value;
	});
}

function addNewFile(tableEl, addFileEl) {
  addFileEl.on('click', function() {

  })
}
