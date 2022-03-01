require('./check-versions')()

var turf = require('turf');
var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

function readGeoJson(fileUrl){
  return new Promise((reslove,reject)=>{
    fs.readFile(fileUrl,(err,data)=>{
      if(err){
        throw err
      }
      reslove(JSON.parse(data))
    })
  })
}
function readXML(fileUrl){
  return new Promise((resolve,reject)=>{
    // 读取文件
     fs.readFile(fileUrl,'utf-8',function(err,data){
      if(err) {
        throw err
      } 
    // 格式转换
      parser.parseString(data, function (parseErr, obj) {
        if(parseErr){
          throw(parseErr) 
        }
        resolve(obj)
      })
    })
  })
}
function writeXML(krpanoObj) { 
  return new Promise((resolve,rejct)=>{
     //对象转回xml
     var xmlStr = builder.buildObject(krpanoObj)
     //写入文件
     fs.writeFile('./static/tour.xml', xmlStr, 'utf8', function (err) {
       if (err) throw err;
        resolve(true)
     })
  })
}

/*
* 利用truf.js 进行角度的计算
 * 计算两点对于正北方向的朝向角度 [0,360]
 * @param {*} start format:[latitude, longitude]
 * @param {*} end
 */
function getHeading(lng_a, lat_a, lng_b, lat_b) {
	let rad = Math.PI / 180,
      	lat1 = lat_a * rad,
      	lat2 = lat_b * rad,
      	lon1 = lng_a * rad,
      	lon2 = lng_b * rad;
    const a = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const b = Math.cos(lat1) * Math.sin(lat2) -
        	  Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
   	return radiansToDegrees(Math.atan2(a, b));
}
function getPitch(){

}
/*
 * 弧度转换为角度
*/
function radiansToDegrees(radians) {
    const degrees = radians % (2 * Math.PI);
    return degrees * 180 / Math.PI < 0 ? 360 + degrees * 180 / Math.PI:degrees * 180 / Math.PI;
}


var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
