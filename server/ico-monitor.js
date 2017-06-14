var util = require("util");
var nem = require("./node_modules/nem-sdk/build/index.js").default;
var	io = require("socket.io")({
		transports : [ "websocket" ]
		
	});

 var nempk = "#########";
    var icomessage = "Thanks"
    var icoaccount = "TACLIEBZPQN54IEQV3YOTQNYP6G7HEVMPQNUY34U"
    var networkid = "-104"
    var mynamepace = "mynamepace name"
    var mymoasic = "my moasic"
    var costper = "100"
    var hashesdone = ""
    var networkId = -104
// Create an NIS endpoint object
var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);


//Monitor the account and send out the moasics
function monitorchain() {
        nem.com.requests.account.incomingTransactions(endpoint, icoaccount).then(function(res) {
                  console.log("Checking Wallet:" +  icoaccount)
                  res.forEach(function(transaction){
                  console.log("Amount: " + transaction.transaction.amount + " SIG: " + transaction.transaction.signature + " HASH: " + transaction.meta.hash.data)
                                           
//I recommend you write these to a database. But since I am lazy, we will just add to a var and check it. //dragons
           console.log("Adding to db and sweeping hash: " + transaction.meta.hash.data)
             //console.log("\nUpdate Balance and Enter into DB:")
            if(hashesdone.indexOf(transaction.meta.hash.data) !== -1) {
                 hashesdone = hashesdone +  transaction.meta.hash.data 
                 //do some math to figure out how many to send. 
                 var numberofmoasicspurchased = transaction.transaction.amount/costper 
                 var addressfrom = nem.model.address.toAddress( transaction.transaction.signer, networkId)
                  
                 sendMoasic(numberofmoasicspurchased , addressfrom);   
                 } else {
                  console.log("Transaction already done...you really should use a db, or at least a persistant file but I am too lazy atm.")
                 }                                                                              



      }, function(err) {
                                                   console.error(err);
                                                 })
                  //end for each

                                                }, function(err) {
                                                   console.error(err);
                                                 })
                                              //end get wallet transactions


}

//Check the nem chain
//====================================================================================================
//Searching player by its ID
function sendMosaic(amount, address) {

// Create an NIS endpoint object
var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

// Create a common object holding key 
var common = nem.model.objects.create("common")("", nempk);

// Create variable to store our mosaic definitions, needed to calculate fees properly (already contains xem definition)
var mosaicDefinitionMetaDataPair = nem.model.objects.get("mosaicDefinitionMetaDataPair");

// Create an un-prepared mosaic transfer transaction object (use same object as transfer tansaction)
var transferTransaction = nem.model.objects.create("transferTransaction")(address, 1, icomessage);


/**
 * ATTACHING ANOTHER MOSAIC
 *
 * Need to get mosaic definition using com.requests
 */

// Create another mosaic attachment
//name of token
var mosaicAttachment2 = nem.model.objects.create("mosaicAttachment")(mynamepace, mymoasic, 1); 

// Push attachment into transaction mosaics
transferTransaction.mosaics.push(mosaicAttachment2);

// Need mosaic definition of nw.fiat:eur to calculate adequate fees, so we get it from network.
// Otherwise you can simply take the mosaic definition from api manually (http://bob.nem.ninja/docs/#retrieving-mosaic-definitions) 
// and put it into mosaicDefinitionMetaDataPair model (objects.js) next to nem:xem (be careful to respect object structure)
nem.com.requests.namespace.mosaicDefinitions(endpoint, mosaicAttachment2.mosaicId.namespaceId).then(function(res) {

    // Look for the mosaic definition(s) we want in the request response (Could use ["eur", "usd"] to return eur and usd mosaicDefinitionMetaDataPairs)
    var neededDefinition = nem.utils.helpers.searchMosaicDefinitionArray(res, [mymoasic]);
    
    // Get full name of mosaic to use as object key
    var fullMosaicName  = nem.utils.helpers.mosaicIdToName(mosaicAttachment2.mosaicId);

    // Check if the mosaic was found
    if(undefined === neededDefinition[fullMosaicName]) return console.error("Mosaic not found !");

    // Set eur mosaic definition into mosaicDefinitionMetaDataPair
    mosaicDefinitionMetaDataPair[fullMosaicName] = {};
    mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition = neededDefinition[fullMosaicName];

    // Prepare the transfer transaction object
    var transactionEntity = nem.model.transactions.prepare("mosaicTransferTransaction")(common, transferTransaction, mosaicDefinitionMetaDataPair, nem.model.network.data.testnet.id);

    // Serialize transfer transaction and announce
    nem.model.transactions.send(common, transactionEntity, endpoint)
}, 
function(err) {
    console.error(err);
});
};


var minutes = .3, the_interval = minutes * 60 * 1000;
setInterval(function() {
  updateChain()
  //console.log("Updating Balances");
  // do your stuff here
}, the_interval);
