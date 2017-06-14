'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _helpers = require('../../utils/helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Determines if NIS is up and responsive.
 *
 * @param {object} endpoint - An NIS endpoint object
 *
 * @return {object} - A [NemRequestResult]{@link http://bob.nem.ninja/docs/#nemRequestResult} object
 */
var heartbeat = function heartbeat(endpoint) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/heartbeat',
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
	heartbeat: heartbeat
};
//# sourceMappingURL=endpoint.js.map