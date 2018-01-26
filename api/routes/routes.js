'use strict';
module.exports = function(app) {
  var titleController = require('../controllers/url-titles-controller');

  // todoList Routes
  app.route('/I/want/title').get(titleController.getTitleHtml);


  app.use(function(req, res, next) {
	 res.status(404);
	 res.send('404: File Not Found');
  });

};