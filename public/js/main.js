$(document).ready(() => {
	Cookies.remove('file')
  // if (checkCookie()) {
  //   readFileFromCookie(Cookies.get('file'));
  // } else {
  //   readSelectedFile();
  // }
  // writeInputToPreviewPanel();
  // addNewFile();
  // saveFile();
  // readSelectedFile();
  // addHighlight();
  // deleteFile();
  iniitalizeSidePaneListener()
});

function writeInputToPreviewPanel() {
  $('textarea.form-control').keyup(function () {
    $('.preview-content')[0].innerHTML = marked(this.value);
  });
}

function iniitalizeSidePaneListener() {
  $('table.table').click(function() {
    let element = event.target;
    // check if new-file
    if (element.className === 'new-file') {
      // if yes, trigger new file process
      addNewFile()
      // check if delete
    } else if (element.className === 'fa fa-trash') {
      // check if saved
      if (!isSaved) {
        alert('File has not been saved!')
      } else {
        deleteFile
      }
    } else {
      readSelectedFile
      addHighlight
    }
      // else

          // if yes,
            // if yes, delete
          // else alert not saved
      // else highlight, read
  });
};

function addNewFile() {
  let table = $('.table');
  let currentFileName = $('.filename');
  // clear out panels
  $('.preview-content').text('');
  $('textarea.form-control')[0].value = '';
  // create new element
  let newTR = $('<tr class="selected file"><td>untitled.md<span><i class="fa fa-trash" aria-hidden="true"></i></span></td></tr>');
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
      let newTR = $('<tr class="selected file"><td>' + result + '<span><i class="fa fa-trash" aria-hidden="true"></i></span></td></tr>');
      table.find('tr.file:last').replaceWith(newTR);
      currentFileName.text(result);
    })
}

function()
//
// function saveFile() {
//   $('.save').click(function () {
//     let data = {
//       data: $('textarea.form-control')[0].value,
//       file: $('.filename')[0].textContent,
//     };
//
// 		fetch('/newfile', {
// 			method: 'post',
// 			headers: {
// 				'Accept': 'application/json',
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify(data)
// 		})
// 		.then(() => {
// 			readSelectedFile();
// 		})
// 		.catch(function(e) {
// 			console.log('There was an error ' + e);
// 		})
// 	});
// }
//
// function onFileClick() {
// 	let text = (this.innerText).toLowerCase();
// 	let url = buildRouteParam(text)
//
// 	fetch(url).then(function(response) {
// 		return response.text();
// 	}).then(function(content) {
// 		readSelectedFile()
// 		$('textarea.form-control')[0].value = content;
// 		$('.preview-content').html(marked(content));
// 		$('.filename').text(text);
// 	});
// }
//
// function readSelectedFile() {
// 	$('tr.file').click(function() {
// 		alert('read selected file was clicked')
// 		onFileClick
// 	});
// }
//
// function addHighlight() {
// 	$('tr').click(function() {
// 		alert('add highlight was clicked')
// 		$('tr').removeClass('selected')
// 		if (this.innerText !== 'New Text') {
// 			this.className = 'selected'
// 			createCookie(this.innerText);
// 		}
// 	})
// }
//
// // Strips the .md from the saved file name to add the required route param.
// function buildRouteParam(filename) {
// 	return '/' + filename.replace(/\.md$/, '');
// }
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
