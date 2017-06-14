"use strict";

var _network = require("./network");

var _network2 = _interopRequireDefault(_network);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var endpoint = function endpoint(host, port) {
    return {
        "host": host || "",
        "port": port || ""
    };
};

var common = function common(password, privateKey) {
    return {
        "password": password || "",
        "privateKey": privateKey || ""
    };
};

var mosaicAttachment = function mosaicAttachment(namespaceId, mosaicName, quantity) {
    return {
        "mosaicId": {
            "namespaceId": namespaceId || "",
            "name": mosaicName || ""
        },
        "quantity": quantity || 0
    };
};

var mosaicDefinitionMetaDataPair = function mosaicDefinitionMetaDataPair() {
    return {
        "nem:xem": {
            "mosaicDefinition": {
                "creator": "3e82e1c1e4a75adaa3cba8c101c3cd31d9817a2eb966eb3b511fb2ed45b8e262",
                "description": "reserved xem mosaic",
                "id": {
                    "namespaceId": "nem",
                    "name": "xem"
                },
                "properties": [{
                    "name": "divisibility",
                    "value": "6"
                }, {
                    "name": "initialSupply",
                    "value": "8999999999"
                }, {
                    "name": "supplyMutable",
                    "value": "false"
                }, {
                    "name": "transferable",
                    "value": "true"
                }],
                "levy": {}
            } /*,
              "another.namespace:mosaic": {
                 "mosaicDefinition": {
                     Add mosaic definitions in this model to simplify transactions for a particular mosaic
                 }
              } ,
              "another.namespace.again:mosaic": {
                 "mosaicDefinition": {
                     ...
                 }
              } */
        } };
};

var invoice = function invoice() {
    return {
        "v": "v = 1 for testnet, v = 2 for mainnet",
        "type": 2,
        "data": {
            "addr": "",
            "amount": 0,
            "msg": "",
            "name": ""
        }
    };
};

/**
 * An un-prepared transfer transaction object
 *
 * @return {object}
 */
var transferTransaction = function transferTransaction(recipient, amount, message) {
    return {
        "amount": amount || 0,
        "recipient": recipient || "",
        "recipientPublicKey": "",
        "isMultisig": false,
        "multisigAccount": "",
        "message": message || "",
        "isEncrypted": false,
        "mosaics": []
    };
};

var signatureTransaction = {};

var multisignatureModificationTransaction = {};

var mosaicDefinitionTransaction = {};

var namespaceProvisionTransaction = {};

var importanceTransferTransaction = {};

/**
 * Get an empty object 
 *
 * @param {string} objectName - The name of the object
 *
 * @retrun {object} - The desired object
 */
var get = function get(objectName) {
    switch (objectName) {
        case "common":
            return common();
            break;
        case "endpoint":
            return endpoint();
            break;
        case "mosaicAttachment":
            return mosaicAttachment();
            break;
        case "mosaicDefinitionMetaDataPair":
            return mosaicDefinitionMetaDataPair();
            break;
        case "invoice":
            return invoice();
            break;
        case "transferTransaction":
            return transferTransaction();
            break;
        default:
            return {};
    }
};

/**
 * Get function creating objects
 *
 * @param {string} objectName - The name of the object
 *
 * @retrun {function} - The object creation function corresponding to the object name
 */
var create = function create(objectName) {
    switch (objectName) {
        case "common":
            return common;
            break;
        case "endpoint":
            return endpoint;
            break;
        case "mosaicAttachment":
            return mosaicAttachment;
            break;
        case "invoice":
            return invoice;
            break;
        case "transferTransaction":
            return transferTransaction;
            break;
        default:
            return {};
    }
};

module.exports = {
    get: get,
    create: create
};
//# sourceMappingURL=objects.js.map