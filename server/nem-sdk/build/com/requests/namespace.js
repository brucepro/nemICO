'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _helpers = require('../../utils/helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlEncodedHeader = {
	'Content-Type': 'application/x-www-form-urlencoded'

	/**
  * Gets root namespaces.
  *
  * @param {object} endpoint - An NIS endpoint object
  * @param {number} id - The namespace id up to which root namespaces are returned (optional)
  *
  * @return {object} - An array of [NamespaceMetaDataPair]{@link http://bob.nem.ninja/docs/#namespaceMetaDataPair} objects
  */
};var roots = function roots(endpoint, id) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/namespace/root/page',
			method: 'GET',
			headers: urlEncodedHeader,
			qs: undefined === id ? { 'pageSize': 100 } : { 'id': id, 'pageSize': 100 }

			// Start the request
		};(0, _request2.default)(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(JSON.parse(body).data);
			} else {
				reject(error);
			}
		});
	});
};

/**
 * Gets mosaic definitions of a namespace
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {string} id - The namespace Id
 *
 * @return {object} - An array of [MosaicDefinition]{@link http://bob.nem.ninja/docs/#mosaicDefinition} objects
 */
var mosaicDefinitions = function mosaicDefinitions(endpoint, id) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/namespace/mosaic/definition/page',
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'namespace': id }

			// Start the request
		};(0, _request2.default)(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(JSON.parse(body).data);
			} else {
				reject(error);
			}
		});
	});
};

/**
 * Gets the namespace with given id.
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {string} id - A namespace id
 *
 * @return {object} - A [NamespaceInfo]{@link http://bob.nem.ninja/docs/#namespace} object
 */
var info = function info(endpoint, id) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/namespace',
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'namespace': id }

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
	roots: roots,
	mosaicDefinitions: mosaicDefinitions,
	info: info
};
//# sourceMappingURL=namespace.js.map