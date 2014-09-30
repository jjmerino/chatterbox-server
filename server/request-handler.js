var url = require('url');
var path = require('path');
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
var routes = microExpress.routes;

exports.handleRequest = function(request, response) {
  var parsedURL = path.resolve(request.url);
  // console.log("Serving request type " + request.method + " for url " + request.url + '\n');
  // var parsedURL= url.parse(request.url, true, true);
  // request.query = parsedURL.query;
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";
  response.writeHead(statusCode, headers);


  if (routes[parsedURL] === undefined) {
    response.writeHead(404, headers);
    response.end("Invalid Route!");
  } else {
    // var route = routes[parsedURL.pathname][request.method] || routes[parsedURL.pathname]['ANY'];
    var route = routes[parsedURL][request.method] || routes[parsedURL]['ANY'];
    var res = route(request,response)
    res && response.end(res);
  }
};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

exports.router = microExpress.router;
