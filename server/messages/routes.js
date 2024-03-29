var router = require('../request-handler').router;
var path = require('path');
var url = require('url');
var msgCollection = {
  messages: [],
  room1: []
};

router.match('/classes', function(req, res) {
  var processUrl = url.parse(req.url);

  var base = path.basename(processUrl.pathname);
  if (msgCollection[base] !== undefined) {
    return JSON.stringify({results:msgCollection[base]});
  } else {
    return JSON.stringify({results:[]});
  }
});

router.post('/classes', function(req, res) {
  var roomname = path.basename(req.url);
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
    msgCollection.messages.unshift(newObj);
    if (newObj.roomname !== undefined) {
      msgCollection[roomname] = msgCollection[roomname] || [];
      msgCollection[roomname].unshift(newObj);
    }
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "application/json";
    res.writeHead(201, headers);
    res.end(JSON.stringify({results:msgCollection.messages}));
  });
});

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};
