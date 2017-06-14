'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _helpers = require('../../utils/helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlEncodedHeader = {
	'Content-Type': 'application/x-www-form-urlencoded'

	/**
  * Gets the AccountMetaDataPair of an account.
  *
  * @param {object} endpoint - An NIS endpoint object
  * @param {string} address - An account address
  *
  * @return {object} - An [AccountMetaDataPair]{@link http://bob.nem.ninja/docs/#accountMetaDataPair} object
  */
};var data = function data(endpoint, address) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/account/get',
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'address': address }

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
 * Gets an array of harvest info objects for an account.
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {string} address - An account address
 *
 * @return {array} - An array of [HarvestInfo]{@link http://bob.nem.ninja/docs/#harvestInfo} objects
 */
var harvestedBlocks = function harvestedBlocks(endpoint, address) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/account/harvests',
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'address': address }

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
 * Gets an array of TransactionMetaDataPair objects where the recipient has the address given as parameter to the request.
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {string} address - An account address
 * @param {string} txHash - A starting hash for search (optional)
 *
 * @return {array} - An array of [TransactionMetaDataPair]{@link http://bob.nem.ninja/docs/#transactionMetaDataPair} objects
 */
var incomingTransactions = function incomingTransactions(endpoint, address, txHash) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/account/transfers/incoming',
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'address': address, 'hash': txHash }

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
 * Gets an array of TransactionMetaDataPair objects where the sender has the address given as parameter to the request.
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {string} address - An account address
 * @param {string} txHash - A starting hash for search (optional)
 *
 * @return {array} - An array of [TransactionMetaDataPair]{@link http://bob.nem.ninja/docs/#transactionMetaDataPair} objects
 */
var outgoingTransactions = function outgoingTransactions(endpoint, address, txHash) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/account/transfers/outgoing',
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'address': address, 'hash': txHash }

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
 * Gets the array of transactions for which an account is the sender or receiver and which have not yet been included in a block.
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {string} address - An account address
 *
 * @return {array} - An array of [UnconfirmedTransactionMetaDataPair]{@link http://bob.nem.ninja/docs/#unconfirmedTransactionMetaDataPair} objects
 */
var unconfirmedTransactions = function unconfirmedTransactions(endpoint, address) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/account/unconfirmedTransactions',
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'address': address }

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
 * Gets information about the maximum number of allowed harvesters and how many harvesters are already using the node
 *
 * @param {object} endpoint - An NIS endpoint object
 *
 * @return {object} - An [UnlockInfo]{@link http://bob.nem.ninja/docs/#retrieving-the-unlock-info} object
 */
var unlockInfo = function unlockInfo(endpoint) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/account/unlocked/info',
			method: 'POST',
			headers: urlEncodedHeader

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
 * Unlocks an account (starts harvesting).
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {string} privateKey - A delegated account private key
 *
 * @return - Nothing
 */
var startHarvesting = function startHarvesting(endpoint, privateKey) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/account/unlock',
			method: 'POST',
			headers: urlEncodedHeader,
			qs: { 'value': privateKey }

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
* Locks an account (stops harvesting).
*
* @param {object} endpoint - An NIS endpoint object
* @param {string} privateKey - A delegated account private key
*
* @return - Nothing
*/
var stopHarvesting = function stopHarvesting(endpoint, privateKey) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/account/lock',
			method: 'POST',
			headers: urlEncodedHeader,
			qs: { 'value': privateKey }

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
 * Gets the AccountMetaDataPair of the account for which the given account is the delegate account
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {string} address - An account address
 *
 * @return {object} - An [AccountMetaDataPair]{@link http://bob.nem.ninja/docs/#accountMetaDataPair} object
 */
var forwarded = function forwarded(endpoint, address) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/account/get/forwarded',
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'address': address }

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
 * Gets namespaces that an account owns
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {string} address - An account address
 * @param {string} parent - The namespace parent (optional)
 *
 * @return {object} - An array of [NamespaceMetaDataPair]{@link http://bob.nem.ninja/docs/#namespaceMetaDataPair} objects
 */
var namespaces = function namespaces(endpoint, address, parent) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/account/namespace/page',
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'address': address, 'parent': parent || "" }

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
 * Gets mosaic definitions that an account has created
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {string} address - An account address
 * @param {string} parent - The namespace parent (optional)
 *
 * @return {object} - An array of [MosaicDefinition]{@link http://bob.nem.ninja/docs/#mosaicDefinition} objects
 */
var mosaicDefinitionsCreated = function mosaicDefinitionsCreated(endpoint, address, parent) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/account/mosaic/definition/page',
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'address': address, 'parent': parent || "" }

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
 * Gets mosaic definitions that an account owns
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {string} address - An account address
 *
 * @return {array} - An array of [MosaicDefinition]{@link http://bob.nem.ninja/docs/#mosaicDefinition} objects
 */
var mosaicDefinitions = function mosaicDefinitions(endpoint, address) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/account/mosaic/owned/definition',
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'address': address }

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
 * Gets mosaics that an account owns
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {string} address - An account address
 *
 * @return {array} - An array of [Mosaic]{@link http://bob.nem.ninja/docs/#mosaic} objects
 */
var mosaics = function mosaics(endpoint, address) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/account/mosaic/owned',
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'address': address }

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
 * Gets all transactions of an account
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {string} address - An account address
 * @param {string} txHash - A starting hash (optional)
 *
 * @return {array} - An array of [TransactionMetaDataPair]{@link http://bob.nem.ninja/docs/#transactionMetaDataPair} objects
 */
var allTransactions = function allTransactions(endpoint, address, txHash) {
	return new Promise(function (resolve, reject) {
		// Configure the request
		var options = {
			url: _helpers2.default.formatEndpoint(endpoint) + '/account/transfers/all',
			method: 'GET',
			headers: urlEncodedHeader,
			qs: { 'address': address, 'hash': txHash || '' }

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

module.exports = {
	data: data,
	harvestedBlocks: harvestedBlocks,
	incomingTransactions: incomingTransactions,
	unconfirmedTransactions: unconfirmedTransactions,
	unlockInfo: unlockInfo,
	stopHarvesting: stopHarvesting,
	startHarvesting: startHarvesting,
	forwarded: forwarded,
	namespaces: namespaces,
	mosaicDefinitionsCreated: mosaicDefinitionsCreated,
	mosaicDefinitions: mosaicDefinitions,
	mosaics: mosaics,
	allTransactions: allTransactions,
	outgoingTransactions: outgoingTransactions
};
//# sourceMappingURL=account.js.map