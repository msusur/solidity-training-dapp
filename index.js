var express = require("express"),
  app = new express(),
  minify = require('express-minify');

app.set('port', (process.env.PORT || 5000));

if (!process.env.DEBUG) {
  app.use(minify({
    cache: true
  }));
}
app.use("/", express.static("static"));
app.use("/vendor", express.static("bower_components"));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});