'use strict';

var _network = require('./network');

var _network2 = _interopRequireDefault(_network);

var _helpers = require('../utils/helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _convert = require('../utils/convert');

var _convert2 = _interopRequireDefault(_convert);

var _transactionTypes = require('./transactionTypes');

var _transactionTypes2 = _interopRequireDefault(_transactionTypes);

var _fees = require('./fees');

var _fees2 = _interopRequireDefault(_fees);

var _serialization = require('../utils/serialization');

var _serialization2 = _interopRequireDefault(_serialization);

var _keyPair = require('../crypto/keyPair');

var _keyPair2 = _interopRequireDefault(_keyPair);

var _cryptoHelpers = require('../crypto/cryptoHelpers');

var _cryptoHelpers2 = _interopRequireDefault(_cryptoHelpers);

var _requests = require('../com/requests');

var _requests2 = _interopRequireDefault(_requests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Set the network version
 *
 * @param {number} val - A version number (1 or 2)
 * @param {number} network - A network id
 *
 * @return {number} - A network version
 */
var NETWORK_VERSION = function NETWORK_VERSION(val, network) {
    if (network === _network2.default.data.mainnet.id) {
        return 0x68000000 | val;
    } else if (network === _network2.default.data.testnet.id) {
        return 0x98000000 | val;
    }
    return 0x60000000 | val;
};

/**
 * Wrap a transaction in a multisignature transaction
 *
 * @param {string} senderPublicKey - The sender public key
 * @param {object} innerEntity - The transaction entity to wrap
 * @param {number} due - The transaction deadline in minutes
 * @param {number} network - A network id
 *
 * @return {object} - A [MultisigTransaction]{@link http://bob.nem.ninja/docs/#multisigTransaction} object
 */
var _multisigWrapper = function _multisigWrapper(senderPublicKey, innerEntity, due, network) {
    var timeStamp = _helpers2.default.createNEMTimeStamp();
    var version = NETWORK_VERSION(1, network);
    var data = _createCommonPart(_transactionTypes2.default.multisigTransaction, senderPublicKey, timeStamp, due, version, network);
    var custom = {
        'fee': _fees2.default.MultisigTransaction,
        'otherTrans': innerEntity
    };
    var entity = _helpers2.default.extendObj(data, custom);
    return entity;
};

/**
 * Create the common part of a transaction
 *
 * @param {number} txType - A type of transaction
 * @param {string} senderPublicKey - The sender public key
 * @param {number} timeStamp - A timestamp for the transation
 * @param {number} due - A deadline in minutes
 * @param {number} version - A network version
 * @param {number} network - A network id
 *
 * @return {object} - A common transaction object
 */
var _createCommonPart = function _createCommonPart(txtype, senderPublicKey, timeStamp, due, version, network) {
    return {
        'type': txtype,
        'version': version || NETWORK_VERSION(1, network),
        'signer': senderPublicKey,
        'timeStamp': timeStamp,
        'deadline': timeStamp + due * 60
    };
};

/**
 * Prepare a transfer transaction object
 *
 * @param {object} common - A common object
 * @param {object} tx - The un-prepared transfer transaction object
 * @param {number} network - A network id
 *
 * @return {object} - A [TransferTransaction]{@link http://bob.nem.ninja/docs/#transferTransaction} object ready for serialization
 */
var prepareTransferTransaction = function prepareTransferTransaction(common, tx, network) {
    if (!common || !tx || !network) throw new Error('Missing parameter !');
    var kp = _keyPair2.default.create(_helpers2.default.fixPrivateKey(common.privateKey));
    var actualSender = tx.isMultisig ? tx.multisigAccount.publicKey : kp.publicKey.toString();
    var recipientCompressedKey = tx.recipient.toString();
    var amount = Math.round(tx.amount * 1000000);
    var message = prepareMessage(common, tx);
    var due = network === _network2.default.data.testnet.id ? 60 : 24 * 60;
    var mosaics = null;
    var mosaicsFee = null;
    var entity = _constructTransferTransaction(actualSender, recipientCompressedKey, amount, message, due, mosaics, mosaicsFee, network);
    if (tx.isMultisig) {
        entity = _multisigWrapper(kp.publicKey.toString(), entity, due, network);
    }
    return entity;
};

/**
 * Prepare a mosaic transfer transaction object
 *
 * @param {object} common - A common object
 * @param {object} tx - The un-prepared transfer transaction object
 * @param {object} mosaicDefinitionMetaDataPair - The mosaicDefinitionMetaDataPair object with properties of mosaics to send
 * @param {number} network - A network id
 *
 * @return {object} - A [TransferTransaction]{@link http://bob.nem.ninja/docs/#transferTransaction} object ready for serialization
 */
var prepareMosaicTransferTransaction = function prepareMosaicTransferTransaction(common, tx, mosaicDefinitionMetaDataPair, network) {
    if (!common || !tx || !mosaicDefinitionMetaDataPair || tx.mosaics === null || !network) throw new Error('Missing parameter !');
    var kp = _keyPair2.default.create(_helpers2.default.fixPrivateKey(common.privateKey));
    var actualSender = tx.isMultisig ? tx.multisigAccount.publicKey : kp.publicKey.toString();
    var recipientCompressedKey = tx.recipient.toString();
    var amount = Math.round(tx.amount * 1000000);
    var message = prepareMessage(common, tx);
    var due = network === _network2.default.data.testnet.id ? 60 : 24 * 60;
    var mosaics = tx.mosaics;
    var mosaicsFee = _fees2.default.calculateMosaics(amount, mosaicDefinitionMetaDataPair, mosaics);
    var entity = _constructTransferTransaction(actualSender, recipientCompressedKey, amount, message, due, mosaics, mosaicsFee, network);
    if (tx.isMultisig) {
        entity = _multisigWrapper(kp.publicKey.toString(), entity, due, network);
    }
    return entity;
};

/***
 * Create a transaction object
 *
 * @param {string} senderPublicKey - The sender account public key
 * @param {string} recipientCompressedKey - The recipient account public key
 * @param {number} amount - The amount to send in micro XEM
 * @param {object} message - The message object
 * @param {number} due - The deadline in minutes
 * @param {array} mosaics - The array of mosaics to send
 * @param {number} mosaicFee - The fees for mosaics included in the transaction
 * @param {number} network - A network id
 *
 * @return {object} - A [TransferTransaction]{@link http://bob.nem.ninja/docs/#transferTransaction} object
 */
var _constructTransferTransaction = function _constructTransferTransaction(senderPublicKey, recipientCompressedKey, amount, message, due, mosaics, mosaicsFee, network) {
    var timeStamp = _helpers2.default.createNEMTimeStamp();
    var version = mosaics ? NETWORK_VERSION(2, network) : NETWORK_VERSION(1, network);
    var data = _createCommonPart(_transactionTypes2.default.transfer, senderPublicKey, timeStamp, due, version);
    var msgFee = message.payload.length ? _fees2.default.calculateMessage(message) : 0;
    var fee = mosaics ? mosaicsFee : _fees2.default.calculateMinimum(amount / 1000000);
    var totalFee = (msgFee + fee) * 1000000;
    var custom = {
        'recipient': recipientCompressedKey.toUpperCase().replace(/-/g, ''),
        'amount': amount,
        'fee': totalFee,
        'message': message,
        'mosaics': mosaics
    };
    var entity = _helpers2.default.extendObj(data, custom);
    return entity;
};

var prepareSignatureTransaction = function prepareSignatureTransaction() {};

var prepareMultisignatureModificationTransaction = function prepareMultisignatureModificationTransaction() {};

var prepareMosaicDefinitionTransaction = function prepareMosaicDefinitionTransaction() {};

var prepareNamespaceProvisionTransaction = function prepareNamespaceProvisionTransaction() {};

var prepareImportanceTransferTransaction = function prepareImportanceTransferTransaction() {};

/**
 * Build a message object
 *
 * @param {object} common - An common object
 * @param {object} tx - An un-prepared transferTransaction object
 *
 * @return {object} - A prepared message object
 */
var prepareMessage = function prepareMessage(common, tx) {
    if (tx.encryptMessage && common.privateKey) {
        return {
            'type': 2,
            'payload': _cryptoHelpers2.default.encode(common.privateKey, tx.recipientPubKey, tx.message.toString())
        };
    } else {
        return {
            'type': 1,
            'payload': _helpers2.default.isHexadecimal(tx.message.toString()) && tx.message.toString().substring(0, 2) === 'fe' ? tx.message.toString() : _convert2.default.utf8ToHex(tx.message.toString())
        };
    }
};

/**
 * Serialize a transaction and broadcast it to the network
 *
 * @param {object} endpoint - An NIS endpoint object
 * @param {object} entity - The prepared transaction object
 * @param {object} common - A password/privateKey object
 *
 * @return {promise} - An announce transaction promise of the NetworkRequests service
 */
var send = function send(common, entity, endpoint) {
    if (!endpoint || !entity || !common) throw new Error('Missing parameter !');
    if (common.privateKey.length !== 64 && common.privateKey.length !== 66) throw new Error('Invalid private key, length must be 64 or 66 characters !');
    if (!_helpers2.default.isHexadecimal(common.privateKey)) throw new Error('Private key must be hexadecimal only !');
    var kp = _keyPair2.default.create(_helpers2.default.fixPrivateKey(common.privateKey));
    var result = _serialization2.default.serializeTransaction(entity);
    var signature = kp.sign(result);
    var obj = {
        'data': _convert2.default.ua2hex(result),
        'signature': signature.toString()
    };
    return _requests2.default.transaction.announce(endpoint, JSON.stringify(obj));
};

/**
 * Prepare a transaction object 
 *
 * @param {string} objectName - The name of the object to prepare
 *
 * @retrun {function} - The prepare function corresponding to the object name
 */
var prepare = function prepare(objectName) {
    switch (objectName) {
        case "transferTransaction":
            return prepareTransferTransaction;
            break;
        case "mosaicTransferTransaction":
            return prepareMosaicTransferTransaction;
            break;
        default:
            return {};
    }
};

module.exports = {
    prepare: prepare,
    send: send,
    prepareMessage: prepareMessage
};
//# sourceMappingURL=transactions.js.map