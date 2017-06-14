'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _helpers = require('../../utils/helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlEncodedHeader = {
	'Content-Type': 'application/x-www-form-urlencoded'
};

var jsonHeader = function jsonHeader(data) {
	return {
		"Content-Type": "application/json",
		"Content-Length": Buffer.from(data).byteLength
	};
};

/**
 * Broadcast a transaction to the NEM network
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {object} obj - A RequestAnnounce object
 *
 * @return {object} - A [NemAnnounceResult]{@link http://bob.nem.ninja/docs/#nemAnnounceResult} object
 */
var announce = function announce(endpoint, serializedTransaction) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/transaction/announce',
			method: 'POST',
			headers: jsonHeader(serializedTransaction),
			json: JSON.parse(serializedTransaction)

			// Start the request
		};(0, _request2.default)(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			} else {
				reject(error);
			}
		});
	});
};

/**
 * Gets a TransactionMetaDataPair object from the chain using it's hash
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {string} txHash - A transaction hash
 *
 * @return {object} - A [TransactionMetaDataPair]{@link http://bob.nem.ninja/docs/#transactionMetaDataPair} object
 */
var byHash = function byHash(endpoint, txHash) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/transaction/get',
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'hash': txHash }

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
	announce: announce,
	byHash: byHash
};
//# sourceMappingURL=transaction.js.map