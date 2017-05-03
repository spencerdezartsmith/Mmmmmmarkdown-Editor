$(document).ready(() => {

  let previewField = $('.preview-content')[0];
  let editorInput = $('textarea.form-control');
  let table = $('.table');
  let newFile = $('.new-file');
  let fileName = $('.filename');

  updateInput(editorInput, previewField);
  addNewFile(table, newFile, fileName);

});

function updateInput(input, preview) {
  input.keyup(function () {
    preview.innerHTML = this.value;
  });
}

function addNewFile(tableEl, addFileEl, fileName) {
  let idx = addFileEl.index(this);

  addFileEl.on('click', function () {
    tableEl.find('tr:last').before('<tr><td>untitled.md<span><i class="fa fa-trash" aria-hidden="true"></i></span></td></tr>');
		fileName.html('untitled.md');

		let newFileName = new Promise((resolve) => {
			setTimeout( () => {
				resolve(prompt('Name your markdown file'));
			}, 1000);
		});

		newFileName.then( (result) => {
    	let str = '<tr><td>' + result + '<span><i class="fa fa-trash" aria-hidden="true"></i></span></td></tr>';
    	tableEl.find('tr:last').prev().replaceWith(str);
			fileName.text(result);
		});
  });
}
