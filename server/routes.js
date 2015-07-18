var samples = require('./controllers/sample.server.controller');

module.exports = function(app) {
  // server routes ==================================
	// handle things like api calls;
	// authentication routes
	app.route('/api/samples')
		.get(samples.list)
		.post(samples.create)
		.delete(samples.deleteAll)
	;

	app.route('/api/samples/:sampleId')
		.get(samples.read)
		.put(samples.update)
		.delete(samples.delete)
	;

	app.param('sampleId', samples.sampleById);

  // frontend routes ==================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./client/index.html');
	});
};
