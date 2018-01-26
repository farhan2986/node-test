var request = require('request');
var util = require('util');
var urlDataFetcher = require('../utils/url-data-fetcher');

exports.getTitleHtml = function(req, res) {
  
  var address = req.query.address;
  var urlArr = !Array.isArray(address) ? [address] : address;

  urlDataFetcher.getUrlDataWithCallback(urlArr, function(arrUrlTitles){
    //renderData(res, arrUrlTitles);
  });

  urlDataFetcher.getUrlDataWithPromise(urlArr).then(function(arrUrlTitles){
    //renderData(res, arrUrlTitles);
  });


  urlDataFetcher.getUrlDataWithAsync(urlArr, function(arrUrlTitles){
    //renderData(res, arrUrlTitles);
  });

  var arrUrlTitles = [];
  urlDataFetcher.getUrlDataWithObservable(urlArr).subscribe(arrUrlTitles.push.bind(arrUrlTitles), () => {}, () => {renderData(res, arrUrlTitles);});
}

function renderData(res, arrUrlData){
    res.render('url-titles-view', {urlData: arrUrlData})    
}