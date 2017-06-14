'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _nodes = require('../../model/nodes');

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlEncodedHeader = {
	'Content-Type': 'application/x-www-form-urlencoded'

	/**
  * Audit an apostille file
  *
  * @param {string} publicKey - The signer public key
  * @param {string} data - The file data of audited file
  * @param {string} signedData - The signed data into the apostille transaction message
  *
  * @return {boolean} - True if valid, false otherwise
  */
};var audit = function audit(publicKey, data, signedData) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _nodes2.default.apostilleAuditServer,
			method: 'POST',
			headers: urlEncodedHeader,
			qs: { 'publicKey': publicKey, 'data': data, 'signedData': signedData }

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
	audit: audit
};
//# sourceMappingURL=apostille.js.map