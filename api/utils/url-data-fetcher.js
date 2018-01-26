var request 	= require('request');
var util 		= require('util');
var async 		= require('async');
var Rx 			= require('rxjs/Rx');
const HTTP_REGEX = /^https?:\/\//i;
const TITLE_REGEX = /[\s\S]+<title>(.*)<\/title>[\s\S]+/ig;


exports.getUrlDataWithCallback = function(arrUrl, callback) {
  var dataArr = [];
  arrUrl.forEach(function(url){
   	_fetchUrlData(url, function(result){
   		dataArr.push(result);
   		if(arrUrl.length == dataArr.length) {
   			callback(dataArr);
   		}
   	});
  });
}

exports.getUrlDataWithPromise = function(arrUrl) {
  var fetchUrlPromisesArr = [];

  arrUrl.forEach(function(url){
   	fetchUrlPromisesArr.push(_fetchUrlDataWithPromise(url));
  });

  return Promise.all(fetchUrlPromisesArr);
}
exports.getUrlDataWithAsync = function(arrUrl, asyncCallback) {
  async.map(arrUrl, function(url , callback){
  	_fetchUrlData(url, callback.bind(null, null));
  }, function (err, all){
  		asyncCallback(all);
  });
}

exports.getUrlDataWithObservable = function(arrUrl) {
  var fetchUrlPromisesArr = [];

  arrUrl.forEach(function(url){
   	fetchUrlPromisesArr.push(_fetchUrlDataWithPromise(url));
  });

  return Rx.Observable.from(fetchUrlPromisesArr).mergeMap(promiseUrl => Rx.Observable.fromPromise(promiseUrl));
}

function _fetchUrlDataWithPromise(url) {
    return new Promise(function(resolve, reject) {
	    _fetchUrlData(url, resolve);
	});
}

function _fetchUrlData(url, onRequestComplete) {
    var appendHTTP = HTTP_REGEX.test(url)?"":"http://";
    var fullUrl = appendHTTP +  url;

    request({uri: fullUrl}, function (error, res, body) {        
        var result = {url: url, title: 'NO RESPONSE'};
        if (!error && res.statusCode === 200) {
            result.title = body.replace(TITLE_REGEX, '$1');
        }
        onRequestComplete(result);
    });
}
