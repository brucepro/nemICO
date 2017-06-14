'use strict';

var _convert = require('./convert');

var _convert2 = _interopRequireDefault(_convert);

var _transactionTypes = require('../model/transactionTypes');

var _transactionTypes2 = _interopRequireDefault(_transactionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check if wallet already present in an array
 *
 * @param {string} walletName - A wallet name
 * @param {array} array - A wallets array
 *
 * @return {boolean} - True if present, false otherwise
 */
var haveWallet = function haveWallet(walletName, array) {
    var i = null;
    for (i = 0; array.length > i; i++) {
        if (array[i].name === walletName) {
            return true;
        }
    }
    return false;
};

/**
 * Check if a multisig transaction needs signature
 *
 * @param {object} multisigTransaction - A multisig transaction
 * @param {object} data - An account data
 *
 * @return {boolean} - True if it needs signature, false otherwise
 */
var needsSignature = function needsSignature(multisigTransaction, data) {
    if (multisigTransaction.transaction.signer === data.account.publicKey) {
        return false;
    }
    if (multisigTransaction.transaction.otherTrans.signer === data.account.publicKey) {
        return false;
    }
    // Check if we're already on list of signatures
    for (var i = 0; i < multisigTransaction.transaction.signatures.length; i++) {
        if (multisigTransaction.transaction.signatures[i].signer === data.account.publicKey) {
            return false;
        }
    }

    if (!data.meta.cosignatoryOf.length) {
        return false;
    } else {
        for (var k = 0; k < data.meta.cosignatoryOf.length; k++) {
            if (data.meta.cosignatoryOf[k].publicKey === multisigTransaction.transaction.otherTrans.signer) {
                return true;
            } else if (k === data.meta.cosignatoryOf.length - 1) {
                return false;
            }
        }
    }
    return true;
};

/**
 * Return the name of a transaction type id
 *
 * @param {number} id - A transaction type id
 *
 * @return {string} - The transaction type name
 */
var txTypeToName = function txTypeToName(id) {
    switch (id) {
        case _transactionTypes2.default.Transfer:
            return 'Transfer';
        case _transactionTypes2.default.ImportanceTransfer:
            return 'ImportanceTransfer';
        case _transactionTypes2.default.MultisigModification:
            return 'MultisigModification';
        case _transactionTypes2.default.ProvisionNamespace:
            return 'ProvisionNamespace';
        case _transactionTypes2.default.MosaicDefinition:
            return 'MosaicDefinition';
        case _transactionTypes2.default.MosaicSupply:
            return 'MosaicSupply';
        default:
            return 'Unknown_' + id;
    }
};

/**
 * Check if a transaction is already present in an array of transactions
 *
 * @param {string} hash - A transaction hash
 * @param {array} array - An array of transactions
 *
 * @return {boolean} - True if present, false otherwise
 */
var haveTx = function haveTx(hash, array) {
    var i = null;
    for (i = 0; array.length > i; i++) {
        if (array[i].meta.hash.data === hash) {
            return true;
        }
    }
    return false;
};

/**
 * Gets the index of a transaction in an array of transactions.
 * It must be present in the array.
 *
 * @param {string} hash - A transaction hash
 * @param {array} array - An array of transactions
 *
 * @return {number} - The index of the transaction
 */
var getTransactionIndex = function getTransactionIndex(hash, array) {
    var i = null;
    for (i = 0; array.length > i; i++) {
        if (array[i].meta.hash.data === hash) {
            return i;
        }
    }
    return 0;
};

/**
 * Return mosaic name from mosaicId object
 *
 * @param {object} mosaicId - A mosaicId object
 *
 * @return {string} - The mosaic name
 */
var mosaicIdToName = function mosaicIdToName(mosaicId) {
    if (!mosaicId) return mosaicId;
    return mosaicId.namespaceId + ":" + mosaicId.name;
};

/**
 * Parse uri to get hostname
 *
 * @param {string} uri - An uri string
 *
 * @return {string} - The uri hostname
 */
var getHostname = function getHostname(uri) {
    var _uriParser = document.createElement('a');
    _uriParser.href = uri;
    return _uriParser.hostname;
};

/**
 * Check if a cosignatory is already present in modifications array
 *
 * @param {string} address - A cosignatory address
 * @param {string} pubKey - A cosignatory public key
 * @param {array} array - A modifications array
 *
 * @return {boolean} - True if present, false otherwise
 */
var haveCosig = function haveCosig(address, pubKey, array) {
    var i = null;
    for (i = 0; array.length > i; i++) {
        if (array[i].address === address || array[i].pubKey === pubKey) {
            return true;
        }
    }
    return false;
};

/**
 * Remove extension of a file name
 *
 * @param {string} filename - A file name with extension
 *
 * @return {string} - The file name without extension
 */
var getFileName = function getFileName(filename) {
    return filename.replace(/\.[^/.]+$/, "");
};

/**
 * Gets extension of a file name
 *
 * @param {string} filename - A file name with extension
 *
 * @return {string} - The file name extension
 */
var getExtension = function getExtension(filename) {
    return filename.split('.').pop();
};

/***
 * NEM epoch time
 *
 * @type {number}
 */
var NEM_EPOCH = Date.UTC(2015, 2, 29, 0, 6, 25, 0);

/**
 * Create a time stamp for a NEM transaction
 *
 * @return {number} - The NEM transaction time stamp in milliseconds
 */
var createNEMTimeStamp = function createNEMTimeStamp() {
    return Math.floor(Date.now() / 1000 - NEM_EPOCH / 1000);
};

/**
 * Fix a private key
 *
 * @param {string} privatekey - An hex private key
 *
 * @return {string} - The fixed hex private key
 */
var fixPrivateKey = function fixPrivateKey(privateKey) {
    return ("0000000000000000000000000000000000000000000000000000000000000000" + privateKey.replace(/^00/, '')).slice(-64);
};

/**
 * Check if a private key is valid
 *
 * @param {string} privatekey - A private key
 *
 * @return {boolean} - True if valid, false otherwise
 */
var isPrivateKeyValid = function isPrivateKeyValid(privateKey) {
    if (privateKey.length !== 64 && privateKey.length !== 66) {
        console.error('Private key length must be 64 or 66 characters !');
        return false;
    } else if (!isHexadecimal(privateKey)) {
        console.error('Private key must be hexadecimal only !');
        return false;
    } else {
        return true;
    }
};

/**
 * Check if a public key is valid
 *
 * @param {string} publicKey - A public key
 *
 * @return {boolean} - True if valid, false otherwise
 */
var isPublicKeyValid = function isPublicKeyValid(publicKey) {
    if (publicKey.length !== 64) {
        console.error('Public key length must be 64 or 66 characters !');
        return false;
    } else if (!isHexadecimal(publicKey)) {
        console.error('Public key must be hexadecimal only !');
        return false;
    } else {
        return true;
    }
};

/**
 * Check and format an url
 *
 * @param {string} node - A custom node from user input
 * @param {number} defaultWebsocketPort - A default websocket port
 *
 * @return {string|number} - The formatted node as string or 1
 */
var checkAndFormatUrl = function checkAndFormatUrl(node, defaultWebsocketPort) {
    // Detect if custom node doesn't begin with "http://"
    var pattern = /^((http):\/\/)/;
    if (!pattern.test(node)) {
        node = "http://" + node;
        var _uriParser = document.createElement('a');
        _uriParser.href = node;
        // If no port we add it
        if (!_uriParser.port) {
            node = node + ":" + defaultWebsocketPort;
        } else if (_uriParser.port !== defaultWebsocketPort) {
            // Port is not default websocket port
            return 1;
        }
    } else {
        // Start with "http://""
        var _uriParser2 = document.createElement('a');
        _uriParser2.href = node;
        // If no port we add it
        if (!_uriParser2.port) {
            node = node + ":" + defaultWebsocketPort;
        } else if (_uriParser2.port !== defaultWebsocketPort) {
            // Port is not default websocket port
            return 1;
        }
    }
    return node;
};

/**
 * Create a time stamp
 *
 * @return {object} - A date object
 */
var createTimeStamp = function createTimeStamp() {
    return new Date();
};

/**
 * Date object to YYYY-MM-DD format
 *
 * @param {object} date - A date object
 *
 * @return {string} - The short date
 */
var getTimestampShort = function getTimestampShort(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    return yyyy + '-' + mm + '-' + dd;
};

/**
 * Date object to date string
 *
 * @param {object} date - A date object
 *
 * @return {string} - The date string
 */
var convertDateToString = function convertDateToString(date) {
    return date.toDateString();
};

/**
 * Mimics jQuery's extend function
 *
 * http://stackoverflow.com/a/11197343
 */
var extendObj = function extendObj() {
    for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
                arguments[0][key] = arguments[i][key];
            }
        }
    }
    return arguments[0];
};

/**
 * Test if a string is hexadecimal
 *
 * @param {string} str - A string to test
 *
 * @return {boolean} - True if correct, false otherwise
 */
var isHexadecimal = function isHexadecimal(str) {
    return str.match('^(0x|0X)?[a-fA-F0-9]+$') !== null;
};

/**
 * Search for mosaic definition(s) into an array of mosaicDefinition objects
 *
 * @param {array} mosaicDefinitionArray - An array of mosaicDefinition objects
 * @param {array} keys - Array of strings with names of the mosaics to find (['eur', 'usd',...])
 *
 * @return {object} - An object of mosaicDefinition objects
 */
var searchMosaicDefinitionArray = function searchMosaicDefinitionArray(mosaicDefinitionArray, keys) {
    var result = {};
    for (var i = 0; i < keys.length; i++) {
        for (var k = 0; k < mosaicDefinitionArray.length; k++) {
            if (mosaicDefinitionArray[k].mosaic.id.name === keys[i]) {
                result[mosaicIdToName(mosaicDefinitionArray[k].mosaic.id)] = mosaicDefinitionArray[k].mosaic;
            }
        }
    }
    return result;
};

/**
 * Mimics jQuery's grep function
 */
var grep = function grep(items, callback) {
    var filtered = [],
        len = items.length,
        i = 0;
    for (i; i < len; i++) {
        var item = items[i];
        var cond = callback(item);
        if (cond) {
            filtered.push(item);
        }
    }

    return filtered;
};

/**
 * Check if a text input amount is valid
 *
 * @param {string} n - The number as a string
 *
 * @return {boolean} - True if valid, false otherwise
 */
var isTextAmountValid = function isTextAmountValid(n) {
    // Force n as a string and replace decimal comma by a dot if any
    var nn = Number(n.toString().replace(/,/g, '.'));
    return !Number.isNaN(nn) && Number.isFinite(nn) && nn >= 0;
};

/**
 * Clean a text input amount and return it as number
 *
 * @param {string} n - The number as a string
 *
 * @return {number} - The clean amount
 */
var cleanTextAmount = function cleanTextAmount(n) {
    return Number(n.toString().replace(/,/g, '.'));
};

/**
 * Convert an endpoint object to an endpoint url
 *
 * @param {object} endpoint - An endpoint object
 *
 * @return {String} - An endpoint url
 */
var formatEndpoint = function formatEndpoint(endpoint) {
    return endpoint.host + ':' + endpoint.port;
};

module.exports = {
    haveWallet: haveWallet,
    needsSignature: needsSignature,
    txTypeToName: txTypeToName,
    haveTx: haveTx,
    getTransactionIndex: getTransactionIndex,
    mosaicIdToName: mosaicIdToName,
    getHostname: getHostname,
    haveCosig: haveCosig,
    getFileName: getFileName,
    getExtension: getExtension,
    createNEMTimeStamp: createNEMTimeStamp,
    fixPrivateKey: fixPrivateKey,
    isPrivateKeyValid: isPrivateKeyValid,
    isPublicKeyValid: isPublicKeyValid,
    checkAndFormatUrl: checkAndFormatUrl,
    createTimeStamp: createTimeStamp,
    getTimestampShort: getTimestampShort,
    convertDateToString: convertDateToString,
    extendObj: extendObj,
    isHexadecimal: isHexadecimal,
    searchMosaicDefinitionArray: searchMosaicDefinitionArray,
    grep: grep,
    isTextAmountValid: isTextAmountValid,
    cleanTextAmount: cleanTextAmount,
    formatEndpoint: formatEndpoint
};
//# sourceMappingURL=helpers.js.map