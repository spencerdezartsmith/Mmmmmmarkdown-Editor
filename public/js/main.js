$(document).ready(() => {

	let saveEl = $('.save');
  let previewField = $('.preview-content')[0];
  let editorInput = $('textarea.form-control');
  let table = $('.table');
  let newFile = $('.new-file');
  let fileName = $('.filename');

  updateInput(editorInput, previewField);
  addNewFile(table, newFile, fileName);
  saveFile(saveEl, fileName, previewField);

});

// Write in the preview pane.
function updateInput(input, preview) {
  input.keyup(function () {
    preview.innerHTML = marked(this.value);
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

function saveFile(saveBtn, fileName, previewContent) {
  saveBtn.click(function () {
		let trimString = previewContent.textContent.trim();
		let data = { data: trimString,
		 						 file: fileName[0].textContent
							 };

		console.log(data);

		fetch('/', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(function(response) {
			console.log(response);
		})
		.catch(function(e) {
			console.log(e);
		})
	});
}
