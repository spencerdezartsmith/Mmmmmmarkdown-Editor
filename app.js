
// Express web server.
var express = require('express');
var bodyParser = require('body-parser');

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
  console.log(req.body);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});
