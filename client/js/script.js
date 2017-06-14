// Load nem-browser library
var nem = require("nem-sdk").default;

var funding-address = "none";
var ico-address = "";

var qrcodePublicAdd = new QRCode(document.getElementById("qrpublicaddress"), {
	width : 200,
	height : 200
});


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var nodes = [];

/**
     * getSupernodes() Get nodes of the node reward program
     *
     * return array of nodes
     */
    function getSupernodes() {
    	//[{"id":"1","alias":"Alice2","ip":"62.75.251.134","nisPort":7890,"pubKey":"cd94cdcfde6878e093bc70e35b575dbe68095c69f73112e67559f71c1fb64c6e","servantPort":7880,"status":1,"latitude":48.5839,"longitude":7.7455,"payoutAddress":"NALICE2A73DLYTP4365GNFCURAUP3XVBFO7YNYOW"},

    	$.getJSON('http://supernodes.nem.io/nodes').done(function(data){
   //console.log(data.nodes[1].ip);
   //We might add in the port here in case they have a different port then default.
    nodes = shuffleArray(data.nodes);
console.log("Node:" + nodes[0].ip + ":" + nodes[0].nisPort);
});
      
       
    }

function buytokens() {
num-to-buy = $('#num-of-shares').val();
//check balance of funding account. 
//buy the tokens. 
//update the display of how many tokens they own?
return
}
function update() {
address = $('#address').val();
qrcodePublicAdd.makeCode(address);
console.log("Node:" + nodes[0].ip + ":" + nodes[0].nisPort);

$('#publicaddress').html(address);
console.log(address);
if (address != "") {
// Get account data
getAccountData(address);

}
return
}

 /**
     * getAccountData() Get account info object from network
     *
     * @param host: The host ip or domain
     * @param address: The address
     *
     * return: AccountMetaDataPair
     */
function  getAccountData(address) {
	var url = "http://" + nodes[0].ip + ":" + nodes[0].nisPort + "/account/get?address=" + address;
      	$.getJSON(url).done(function(data){
      		console.log("Balance: " + data.account.balance);
      		$('#addressdata').html("Balance: " + data.account.balance/1000000);
});
      
    }


getSupernodes();

var minutes = .5, the_interval = minutes * 60 * 1000;
setInterval(function() {
getSupernodes();
}, the_interval);


