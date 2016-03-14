var express = require('express');
var app = express();

app.use(express.static(__dirname + '/www'));

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server started. Open http://localhost:3000 in your browser.');
});
