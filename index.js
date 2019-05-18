const app = require('./src/server');

app.listen(process.env.PORT || 8080, function() {
  console.log('listening on port ' + (process.env.PORT || 8080) + '!');
});
