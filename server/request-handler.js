var url = require('url');
var path = require('path');
var fileSystem = require('fs');
var microExpress = {};
var routes = {};
var myExpress ={
  get: function(url,callback) {
    routes[url] = routes[url] || {};
    routes[url]['GET'] = callback;
  },
  post: function(url, callback) {
    routes[url] = routes[url] || {};
    routes[url]['POST'] = callback;
  },
  match: function(url,callback) {
    routes[url] = routes[url] || {};
    routes[url]['ANY'] = callback;
  }
}
microExpress.router = myExpress;
microExpress.routes = routes;
routes = microExpress.routes;

var handleRequest = function(request, response) {
  var processUrl = url.parse(request.url);
  var parsedURL = request.url.split('/')[1] === 'classes' ? path.dirname(processUrl.pathname) : path.resolve(processUrl.pathname);
  if (parsedURL[parsedURL.length - 1] === '/') {
    parsedURL = parsedURL.slice(0, -1);
  }

  console.log("Serving request type " + request.method + " for url " + request.url + '\n');
  var statusCode = 200;
  var headers = defaultCorsHeaders;

  console.log(path.resolve(processUrl.pathname));
  if (path.extname(request.url).length > 0 || path.resolve(processUrl.pathname) === '/'){
    var param = path.resolve(processUrl.pathname).length <= 1 ? '/index.html' : path.resolve(processUrl.pathname);
    var dir = '../client' + param;
    console.log(dir);
    response.writeHead(statusCode, headers);
    var readFile = fileSystem.createReadStream(dir);
    readFile.pipe(response);
  } else if (routes[parsedURL] === undefined || (routes[parsedURL][request.method] === undefined && routes[parsedURL]['ANY'] === undefined)) {
    response.writeHead(404, headers);
    response.end("Invalid Route!");
  } else {
    headers['Content-Type'] = "application/json";
    response.writeHead(statusCode, headers);
    var route = routes[parsedURL][request.method] || routes[parsedURL]['ANY'];
    var res = route(request,response);
    res && response.end(res);
  }
};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

exports.handler = handleRequest;
exports.handleRequest = handleRequest;
exports.router = microExpress.router;
