var routes = {
}

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


exports.router = myExpress;
exports.routes = routes;
