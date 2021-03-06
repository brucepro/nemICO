"use strict";

/**
* Networks info data
*
* @type {object}
*/
var data = {
    "mainnet": {
        "id": 104,
        "prefix": "68",
        "char": "N"
    },
    "testnet": {
        "id": -104,
        "prefix": "98",
        "char": "T"
    },
    "mijin": {
        "id": 96,
        "prefix": "60",
        "char": "M"
    }

    /**
     * Gets a network prefix from network id
     *
     * @param {number} id - A network id
     *
     * @return {string} - The network prefix
     */
};var id2Prefix = function id2Prefix(id) {
    if (id === 104) {
        return "68";
    } else if (id === -104) {
        return "98";
    } else {
        return "60";
    }
};

/**
 * Gets the starting char of the addresses of a network id
 *
 * @param {number} id - A network id
 *
 * @return {string} - The starting char of addresses
 */
var id2Char = function id2Char(id) {
    if (id === 104) {
        return "N";
    } else if (id === -104) {
        return "T";
    } else {
        return "M";
    }
};

/**
 * Gets the network id from the starting char of an address
 *
 * @param {string} startChar - A starting char from an address
 *
 * @return {number} - The network id
 */
var char2Id = function char2Id(startChar) {
    if (startChar === "N") {
        return 104;
    } else if (startChar === "T") {
        return -104;
    } else {
        return 96;
    }
};

module.exports = {
    data: data,
    id2Prefix: id2Prefix,
    id2Char: id2Char,
    char2Id: char2Id
};
//# sourceMappingURL=network.js.map