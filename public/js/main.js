$(document).ready(() => {
	Cookies.remove('file')
  // if (checkCookie()) {
  //   readFileFromCookie(Cookies.get('file'));
  // } else {
  //   readSelectedFile();
  // }
  writeInputToPreviewPanel();
  // addNewFile();
  // saveFile();
  // readSelectedFile();
  // addHighlight();
  // deleteFile();
  iniitalizeSidePaneListener();
  initializeSaveButton();
});

function writeInputToPreviewPanel() {
  $('textarea.form-control').keyup(function () {
    $('.preview-content')[0].innerHTML = marked(this.value);
  });
};

function iniitalizeSidePaneListener() {
  $('table.table').click(function() {
    let target = event.target;
    // check if new-file
    if (target.className === 'new-file' || target.className == 'fa fa-plus') {
      $('table').find('td.selected').removeClass('selected');
      // if yes, trigger new file process
      addNewFile();
      // check if delete
    } else if (target.className === 'fa fa-trash') {
      deleteFile(target);
    } else {
      onFileClick(target);
      addHighlight(target);
    }
      // else

          // if yes,
            // if yes, delete
          // else alert not saved
      // else highlight, read
  });
};

function initializeSaveButton() {
  $('.save').click(function() {
    console.log('save button clicked')
    saveFile()
  })
};

function addNewFile() {
  let table = $('.table');
  let currentFileName = $('.filename');
  // clear out panels
  $('.preview-content').text('');
  $('textarea.form-control')[0].value = '';
  // create new element
  let newTR = $('<tr class="file"><td class="selected">untitled.md<span><i class="fa fa-trash" aria-hidden="true"></i></span></td></tr>');
  table.find('tr:last').before(newTR);
  currentFileName.html('untitled.md');

  // Delay prompt for new file name to allow the added row to update with 'untitled.md' first.
  new Promise((resolve) => {
    setTimeout( () => {
      let fileStr = prompt('Name your markdown file');
      if(fileStr === '' || fileStr === null) { fileStr = 'untitled.md'; }
      resolve(fileStr);
      }, 300);
    })
    .then((result) => {
      let newTR = $('<tr class="file"><td class="selected">' + result + '<span><i class="fa fa-trash" aria-hidden="true"></i></span></td></tr>');
      table.find('tr.file:last').replaceWith(newTR);
      currentFileName.text(result);
      createFile();
    })
}

function addHighlight(elem) {
  $('table').find('td.selected').removeClass('selected');
  elem.className = 'selected';
}

function createFile() {
  let url = '/createFile';
  let data = {
        data: $('textarea.form-control')[0].value,
        file: $('.filename')[0].textContent,
      };

  postToServer(url, data)
};

function saveFile() {
  let url = '/saveFile';
  let data = {
        data: $('textarea.form-control')[0].value,
        file: $('.filename')[0].textContent,
      };

  postToServer(url, data)
};

function postToServer(url, data) {
  fetch(url, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(() => {
      // read the file from the backend
			console.log('file was saved');
		})
		.catch(function(e) {
			console.log('There was an error ' + e);
		})
}

function deleteFile(elem) {
  let url = buildRouteParam(elem.closest('td').textContent)
  fetch(url, {
    method: 'delete'
  }).then(() => {
    elem.closest('tr').remove();
  })
}

//
function onFileClick(file) {
	let text = (file.innerText).toLowerCase();
	let url = buildRouteParam(text);

	fetch(url).then(function(response) {
		return response.text();
	}).then(function(content) {
		console.log('returned content from server ' + content)
    loadFileContents(content);
	});
}

function loadFileContents(fileContent) {
  $('textarea').val(fileContent);
  $('.preview-content').html(marked(fileContent));
}
//
// function readSelectedFile() {
// 	$('tr.file').click(function() {
// 		alert('read selected file was clicked')
// 		onFileClick
// 	});
// }
//

// // Strips the .md from the saved file name to add the required route param.
function buildRouteParam(filename) {
	return '/' + filename.replace(/\.md$/, '');
}
//
// function createCookie(fileName) {
// 	Cookies.remove('file');
// 	Cookies.set('file', fileName, { expires : 2 });
// }
//
// function checkCookie() {
// 	return Cookies.get('file') === 'undefined' ? false : true;
// }
//
// function readFileFromCookie(fileName) {
// 	let url = buildRouteParam(fileName);
//
// 	fetch(url).then(function(response) {
// 		return response.text();
// 	}).then(function(content) {
// 		$(`tr.file:contains('${fileName}')`).addClass('selected');
// 		$('textarea.form-control')[0].value = content;
// 		$('.preview-content').html(marked(content));
// 		$('.filename').text(fileName);
// 	});
// }
//
// function deleteFile() {
//   $('i.fa.fa-trash').click(function(event) {
// 		alert('delete file was clicked')
//     // event.stopPropagation()
//     let fileName = $('i.fa.fa-trash').parent().parent()[0].textContent;
//     let url = buildRouteParam(fileName);
//
//     fetch(url, {
//       method: 'delete'
//     }).then(() => {
//       $(this).closest('tr').remove();
//       $('textarea.form-control').val('');
//       $('.preview-content').html('');
//     })
//   });
// }
