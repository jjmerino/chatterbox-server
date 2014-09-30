var router = require('../request-handler').router;
var msgCollection = [];

router.match('/', function(req, res) {
  return "Your awesome at the home page";
});

router.get('/classes/messages', function(req, res) {
  return JSON.stringify({results:msgCollection});
});

router.post('/classes/messages', function(req, res) {
  // var params = req.query;
  var ret = "";

  req.on('data',function(chunk){
    ret += chunk;
  });
  req.on('end',function(){
    var obj = JSON.parse(ret);
    var newObj = {
      createdAt: (new Date()).toISOString(),
      objectId: Math.floor(Math.random()*9999999).toString(16),
      message: obj.message,
      username: obj.username,
      roomname: obj.roomname
    };
    msgCollection.unshift(newObj);
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "application/json";
    res.writeHead(201, headers);
    res.end(JSON.stringify({results:msgCollection}));
  });
});

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};
