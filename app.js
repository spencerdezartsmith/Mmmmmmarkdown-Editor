
// Express web server.
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// Set the routes.
app.get('/', (req, res) => {
  // Get the markdown files in the data directory.
  let dir = __dirname + '/data/';
  fs.readdir(dir, (err, files) => {
    if (err) {
      throw err;
    } else {
      res.render('index', { files: files });
    }
  });

});

app.get('/:file', (req, res) => {
  let file  = __dirname + '/data/' + req.params.file + '.md';

  Promise.resolve(fs.readFileSync(file, 'utf8'))
    .then(res.send.bind(res));
});

app.post('/newfile', (req, res) => {
  let dir = __dirname + '/data/' + req.body.file;
  let fd = fs.openSync(dir, 'ax+');

  fs.writeSync(fd, req.body.data);
  fs.close(fd);

  res.sendStatus(200);
});

app.delete('/:file', (req, res) => {
  let file  = __dirname + '/data/' + req.params.file + '.md';
  let dir = __dirname + '/data/';
  let files;

  fs.unlink(file, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});
