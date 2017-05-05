$(document).ready(() => {

	let saveEl = $('.save');
  let previewField = $('.preview-content')[0];
  let updatedPreview= $('.preview-content');
  let editorInput = $('textarea.form-control');
  let table = $('.table');
  let newFile = $('.new-file');
  let fileName = $('.filename');
	let tableRow = $('tr');

  updateTextInPreview();
  addNewFile();
  saveFile(saveEl, fileName, editorInput, tableRow, updatedPreview);
	populateText(tableRow, editorInput, updatedPreview);

});

function updateTextInPreview() {
  $('textarea.form-control').keyup(function () {
    $('.preview-content')[0].innerHTML = marked(this.value);
  });
}

function addNewFile() {
	let table = $('.table');
	let textarea = $('textarea.form-control')[0];
	let previewPanel = $('.preview-content');
	let currentFileName = $('.filename')

  $('.new-file').on('click', function () {
		previewPanel.text('');
		textarea.value = '';

		table.find('tr:last').before('<tr><td>untitled.md<span><i class="fa fa-trash" aria-hidden="true"></i></span></td></tr>');
  	currentFileName.html('untitled.md');

		// Delay prompt for new file name to allow the added row to update with 'untitled.md' first
		let newFileName = new Promise((resolve) => {
			setTimeout( () => {
				let fileStr = prompt('Name your markdown file');
				if(fileStr === '') { fileStr = 'untitled.md'; }
				resolve(fileStr);
				}, 300);
			});

		// Add chosen filename to new row element
    newFileName.then((result) => {
      let str = '<tr><td>' + result + '<span><i class="fa fa-trash" aria-hidden="true"></i></span></td></tr>';
      table.find('tr:last').prev().replaceWith(str);
      currentFileName.text(result);
    });
  });
}

function saveFile(saveBtn, fileName, editorContent, tableRow, updatedPreview) {
  saveBtn.click(function () {
		let editorData = editorContent[0].value;
		console.log(editorData);
		let data = { data: editorData,
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
			populateText(tableRow, editorContent, updatedPreview);
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
