
var express = require('express');

var app = express();

app.set('views', __dirname + '/views');

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});
