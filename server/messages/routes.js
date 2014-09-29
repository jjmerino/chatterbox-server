var router = require('../request-handler').router;
var messageCollection = [];

router.match('/', function(req, res) {
  return "Your awesome at the home page";
});

router.get('/1/classes/chatterbox', function(req, res) {
  var params = req.query;
  console.log(params);
  // return messageCollection;
  return "Successfully retrieved";
});

router.post('/1/classes/chatterbox', function(req, res) {
  var params = req.query;
  console.log(params);
  messageCollection.push(req.data);
  return "Successfully Messaged Server!";
});
