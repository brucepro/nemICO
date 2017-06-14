'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _nodes = require('../../model/nodes');

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlEncodedHeader = {
	'Content-Type': 'application/x-www-form-urlencoded'

	/**
  * Gets market information from Poloniex api
  *
  * @return {object} - A MarketInfo object
  */
};var xem = function xem() {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _nodes2.default.marketInfo,
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'command': 'returnTicker' }

			// Start the request
		};(0, _request2.default)(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(JSON.parse(body)["BTC_XEM"]);
			} else {
				reject(error);
			}
		});
	});
};

/**
 * Gets BTC price from blockchain.info API
 *
 * @return {object} - A MarketInfo object
 */
var btc = function btc() {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _nodes2.default.btcPrice,
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'cors': true }

			// Start the request
		};(0, _request2.default)(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(JSON.parse(body)["USD"]);
			} else {
				reject(error);
			}
		});
	});
};

module.exports = {
	xem: xem,
	btc: btc
};
//# sourceMappingURL=market.js.map