'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _helpers = require('../../utils/helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the current height of the block chain.
 *
 * @param {object} endpoint - An NIS endpoint object
 *
 * @return {object} - A [BlockHeight]{@link http://bob.nem.ninja/docs/#block-chain-height} object
 */
var height = function height(endpoint) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/chain/height',
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

/**
 * Gets the current last block of the chain.
 *
 * @param {object} endpoint - An NIS endpoint object
 *
 * @return {object} -
 */
var lastBlock = function lastBlock(endpoint) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/chain/last-block',
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

/**
 * Gets network time (in ms)
 *
 * @param {object} endpoint - An NIS endpoint object
 *
 * @return {object} - A [communicationTimeStamps]{@link http://bob.nem.ninja/docs/#communicationTimeStamps} object
 */
var time = function time(endpoint) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/time-sync/network-time',
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
	height: height,
	lastBlock: lastBlock,
	time: time
};
//# sourceMappingURL=chain.js.map