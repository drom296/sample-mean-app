var app = angular.module('sampleApp', ['ngResource']);

app.controller('sampleController', [
  '$scope', 'Sample',
  function($scope, Sample) {
    // Find a list of Samples
		$scope.find = function() {
			$scope.samples = Sample.query();
		};
  }
]);

app.factory('Sample', [
  '$resource',
  function($resource) {
    return $resource('/api/samples/:sampleId',
			{ sampleId: '@_id'},
			{ update: {method: 'PUT'} }
		);
  }
]);
