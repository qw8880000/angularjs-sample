
'use strict';

var express = require('express'), 
  app = express(),
  proxy = require('express-http-proxy'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  env = process.env.NODE_ENV || 'development';

var clientPath = (env === 'development') ? './src/client':'./dist';

if (env === 'development') {
  // the middleware of grunt-contrib-watch , to make browser livereload
  app.use(require('connect-livereload')({
    port: 35729
  }));
}

// proxy
app.use('/api', proxy('192.168.161.222:9100', {
  proxyReqPathResolver: function(req) {
    var proxyPath = '/api' + req.url;
    console.log('proxy to:' + '192.168.161.222:9100' + proxyPath);
    return proxyPath;
  }
}));

app.set('port', process.env.PORT || 3002);
app.set('bind-address', process.env.BIND_ADDRESS || 'localhost');

// HTTP request logger
if (env !== 'development') {
  app.use(logger('dev'));
}

// serving public files
app.use(express.static(clientPath));
// serving a favicon
// app.use(favicon(path.join(clientPath, '/favicon.ico')));

// routes
app.use('/', express.static(path.join(clientPath, '/index.html')));

app.listen(app.get('port'), function() {
    
    console.log('Express server listening on port ' + app.get('port'));
    console.log('\t http://' + app.get('bind-address') + ':' + app.get('port') + '\n');

});

