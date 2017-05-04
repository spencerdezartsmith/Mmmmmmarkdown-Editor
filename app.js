
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
  res.render('index');
});

app.post('/', (req, res) => {
  let dataDir = '/Users/jwalia/programming/web-dev/hello-web-servers/data/';
  let dir = dataDir + req.body.file;

  fs.writeFile(dir, req.body.data, { flag: 'wx' }, (error) => {
    if (error) throw error;
    console.log(dir + ' has been saved.');
  });

});

app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});
