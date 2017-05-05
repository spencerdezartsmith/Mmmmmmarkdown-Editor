$(document).ready(() => {

  updateTextInPreview();
  addNewFile();
  saveFile();
	readSelectedFile();

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

function saveFile() {
  $('.save').click(function () {

		let data = {
			data: $('textarea.form-control')[0].value,
			file: $('.filename')[0].textContent
		};

		fetch('/newfile', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(function(response) {
			readSelectedFile();
		})
		.catch(function(e) {
			console.log('There was an error ' + e);
		})
	});
}

function readSelectedFile() {
	$('tr').click(function () {
    console.log('you clicked me')
		let text = (this.innerText).toLowerCase();
		let params = /^.*(?=(\.md))/.exec(text)[0];
		let url = '/' + params;

		fetch(url).then(function(response) {
			return response.text();
		}).then(function(content) {
			$('textarea.form-control').text(content);
			$('.preview-content').html(marked(content));
      $('.filename').text(text);
		});
	});
}
