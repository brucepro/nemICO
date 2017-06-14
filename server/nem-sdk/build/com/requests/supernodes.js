'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _nodes = require('../../model/nodes');

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets all nodes of the node reward program
 *
 * @return {array} - An array of SuperNodeData objects
 */
var all = function all() {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _nodes2.default.supernodes,
			method: 'GET'

			// Start the request
		};(0, _request2.default)(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(JSON.parse(body));
			} else {
				reject(error);
			}
		});
	});
};

module.exports = {
	all: all
};
//# sourceMappingURL=supernodes.js.map