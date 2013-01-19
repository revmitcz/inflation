var express = require('express')
  , routes = require('./routes')
  , convert = require('./routes/convert.js')
  , http = require('http')
  , path = require('path')
  , sm = require('sitemap')
  , compare = require('../lib/calc.js')

var app = express();

var sitemap_urls = [];
for (var i=1900; i <= compare.max_year; i++) {
  var jstart = i;
  if (i < 1950) {
    jstart = 1990;
  }
  for (var j=jstart; j <= compare.max_year; j++) {
    if (i===j) continue;
    var priority;
    if (i > 1990 && j > 1990) {
      priority = .8;
    }
    else if (i > 1970 && j > 1970) {
      priority = .6;
    }
    else if (i > 1900 && j > 1900) {
      priority = .4;
    }
    else {
      priority = .2;
    }
    sitemap_urls.push({url: 'inflation-' + i + '-to-' + j, changefreq: 'yearly', priority: priority});
    sitemap_urls.push({url: 'in-' + i + '-dollars', changefreq: 'yearly', priority: priority});
    sitemap_urls.push({url: i + '-dollars-in-' + j + '-dollars', changefreq: 'yearly', priority: priority});
  }
}
console.log(sitemap_urls.length, 'in sitemap');
var sitemap = sm.createSitemap ({
  hostname: 'http://www.in2013dollars.com/',
  cacheTime: 600000,        // 600 sec - cache purge period
  urls: sitemap_urls,
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', convert.home);
app.get('/inflation-:year-to-:year2', convert.main);
app.get('/in-:year-dollars', convert.main);
app.get('/:year-dollars-in-:year2-dollars', convert.main);
app.get('/:year-dollars-in-:year2', convert.main);
app.get('/year-:year', convert.main);
app.get('/:year/:year2', convert.main);
app.get('/sitemap.xml', function(req, res) {
  sitemap.toXML( function (xml) {
      res.header('Content-Type', 'application/xml');
      res.send( xml );
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
