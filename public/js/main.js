$(document).ready(() => {

  // Cookies.remove('file');
  console.log(Cookies.get('file'));

  if(checkCookie()) {
    readFileFromCookie(Cookies.get('file'));
  } else {
	   readSelectedFile();
  }

  writeInputToPreviewPanel();
  addNewFile();
  saveFile();
	readSelectedFile();
  addHighlight();
});

function writeInputToPreviewPanel() {
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
    $('tr').removeClass('selected')
		previewPanel.text('');
		textarea.value = '';

		table.find('tr:last').before('<tr class="selected"><td>untitled.md<span><i class="fa fa-trash" aria-hidden="true"></i></span></td></tr>');
  	currentFileName.html('untitled.md');

		// Delay prompt for new file name to allow the added row to update with 'untitled.md' first.
		let newFileName = new Promise((resolve) => {
			setTimeout( () => {
				let fileStr = prompt('Name your markdown file');
				if(fileStr === '' || fileStr === null) { fileStr = 'untitled.md'; }
				resolve(fileStr);
				}, 300);
			});

		// Add chosen filename to new row element.
    newFileName.then((result) => {
      let str = '<tr class="selected"><td>' + result + '<span><i class="fa fa-trash" aria-hidden="true"></i></span></td></tr>';
      table.find('tr:last').prev().replaceWith(str);
      currentFileName.text(result);
      addHighlight();
      createCookie(result);
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
		.then(() => {
      readSelectedFile();
    })
		.catch(function(e) {
			console.log('There was an error ' + e);
		})
	});
}

function readSelectedFile() {
	$('tr').click(function () {
		let text = (this.innerText).toLowerCase();
		let url = buildRouteParam(text)

		fetch(url).then(function(response) {
			return response.text();
		}).then(function(content) {
      readSelectedFile()
			$('textarea.form-control')[0].value = content;
			$('.preview-content').html(marked(content));
      $('.filename').text(text);
		});
	});
}

function addHighlight() {
  $('tr').click(function() {
    $('tr').removeClass('selected')
    if (this.innerText !== 'New Text') {
      this.className = 'selected'
      createCookie(this.innerText);
    }
  })
}

// Strips the .md from the saved file name to add the required route param.
function buildRouteParam(filename) {
	let params = /^.*(?=(\.md))/.exec(filename)[0];
	return '/' + params;
}

function createCookie(fileName) {
  Cookies.remove('file');
  Cookies.set('file', fileName, { expires : 2 });
}

function checkCookie() {
  return Cookies.get('file') === 'undefined' ? false : true;
}

function readFileFromCookie(fileName) {
  let url = buildRouteParam(fileName);

	fetch(url).then(function(response) {
		return response.text();
	}).then(function(content) {
    $(`tr:contains('${fileName}')`).addClass('selected');
		$('textarea.form-control')[0].value = content;
		$('.preview-content').html(marked(content));
    $('.filename').text(fileName);
	});
}
