$(document).ready(() => {
  writeInputToPreviewPanel();
  iniitalizeSidePaneListener();
  initializeSaveButton();
  cookieCheck();
});

function writeInputToPreviewPanel() {
  $('textarea.form-control').keyup(function () {
    $('.preview-content')[0].innerHTML = marked(this.value);
  });
};

function iniitalizeSidePaneListener() {
  $('table.table').click(function() {
    let target = event.target;
    // check if new file was clicked
    if (target.id === 'addnew' || target.id == 'plus') {
      $('table').find('td.selected').removeClass('selected');
      addNewFile();
    } else if (target.id === 'delete') {
      deleteFile(target);
    } else if (target.className === 'file') {
			// no catch all. be more specific
      onFileClick(target);
      addHighlight(target);
    }
  });
};

function initializeSaveButton() {
  $('.save').click(function() {
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
  Cookies.set('currentFile', elem.innerText, { expires: 7 });
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

function onFileClick(file) {
  let text;
  if (typeof file === "string") {
    text = file;
  } else {
    text = (file.innerText).toLowerCase();
  };
	let url = buildRouteParam(text);

	fetch(url).then(function(response) {
		return response.text();
	}).then(function(content) {
    loadFileContents(content);
	});
}

function loadFileContents(fileContent) {
  $('textarea').val(fileContent);
  $('.preview-content').html(marked(fileContent));
}

// Strips the .md from the saved file name to add the required route param.
function buildRouteParam(filename) {
	return '/' + filename.replace(/\.md$/, '');
}

// Implement cookies
function cookieCheck() {
  if (Cookies.get()) {
    let fileStr = Cookies.get().currentFile;
    let cookieElem = $(`td:contains('${fileStr}')`)[0];
    onFileClick(fileStr);
    addHighlight(cookieElem);
  }
}
