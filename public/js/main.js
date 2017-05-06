$(document).ready(() => {
	Cookies.remove('file')
  // if (checkCookie()) {
  //   readFileFromCookie(Cookies.get('file'));
  // } else {
  //   readSelectedFile();
  // }
  writeInputToPreviewPanel();
  addNewFile();
  saveFile();
  readSelectedFile();
  addHighlight();
  deleteFile();
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
  let currentFileName = $('.filename');

  $('.new-file').on('click', function () {
    $('tr.file').removeClass('selected');
    previewPanel.text('');
  	textarea.value = '';

    let newTR = $('<tr class="selected file"><td>untitled.md<span><i class="fa fa-trash" aria-hidden="true"></i></span></td></tr>');
    newTR.click(onFileClick);
  	table.find('tr:last').before(newTR);
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
  		let newTR = $('<tr class="selected file"><td>' + result + '<span><i class="fa fa-trash" aria-hidden="true"></i></span></td></tr>');
      newTR.click(onFileClick);
      table.find('tr.file:last').replaceWith(newTR);
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
      file: $('.filename')[0].textContent,
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

function onFileClick() {
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
}

function readSelectedFile() {
	$('tr.file').click(onFileClick);
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
	return '/' + filename.replace(/\.md$/, '');
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
		$(`tr.file:contains('${fileName}')`).addClass('selected');
		$('textarea.form-control')[0].value = content;
		$('.preview-content').html(marked(content));
		$('.filename').text(fileName);
	});
}

function deleteFile() {
  $('i.fa.fa-trash').click(function(event) {
    event.stopPropagation()
    let fileName = $('i.fa.fa-trash').parent().parent()[0].textContent;
    let url = buildRouteParam(fileName);

    fetch(url, {
      method: 'delete'
    }).then(() => {
      $(this).closest('tr').remove();
      $('textarea.form-control').val('');
      $('.preview-content').html('');
    })
  });
}
