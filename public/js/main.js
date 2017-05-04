$(document).ready(() => {

	let saveEl = $('.save');
  let previewField = $('.preview-content')[0];
  let updatedPreview= $('.preview-content');
  let editorInput = $('textarea.form-control');
  let table = $('.table');
  let newFile = $('.new-file');
  let fileName = $('.filename');
	let tableRow = $('tr');

  updateInput(editorInput, previewField);
  addNewFile(table, editorInput, updatedPreview, newFile, fileName);
  saveFile(saveEl, fileName, previewField);
	populateText(tableRow, editorInput, updatedPreview);

});

// Write in the preview pane.
function updateInput(input, preview) {
  input.keyup(function () {
    preview.innerHTML = marked(this.value);
  });
}

function addNewFile(tableEl, editorEl, previewEl, addFileEl, fileName) {
  let idx = addFileEl.index(this);

  addFileEl.on('click', function () {

		previewEl.text('');
		editorEl.text('');

		tableEl.find('tr:last').before('<tr><td>untitled.md<span><i class="fa fa-trash" aria-hidden="true"></i></span></td></tr>');
  	fileName.html('untitled.md');

		let newFileName = new Promise((resolve) => {
			setTimeout( () => {
				let fileStr = prompt('Name your markdown file');
				if(fileStr == '') { fileStr = 'untitled.md'; }
				resolve(fileStr);
				}, 300);
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
		let trimString = previewContent.textContent;
		console.log(trimString);
		let data = { data: trimString,
		 						 file: fileName[0].textContent
							 };

		console.log(data);

		fetch('/newfile', {
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

function populateText(rowElem, editorElem, previewElem) {
	rowElem.click(function () {
		let text = (this.innerText).toLowerCase();
		let filename = /^.*(?=(\.md))/.exec(text)[0];
		let url = '/' + filename;

		fetch(url).then(function(response) {
			return response.text();
		}).then(function(content) {
			let markedText = marked(content);
			editorElem.text(content);
			previewElem.html(markedText);
		});
	});
}
