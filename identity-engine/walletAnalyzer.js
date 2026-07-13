import { ethers } from "ethers";

const RPC =
"https://mainnet.base.org";

const provider =
new ethers.JsonRpcProvider(RPC);


const TRANSFER =
"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";


export async function analyzeWallet(wallet){

wallet =
wallet.toLowerCase();


let latest =
await provider.getBlockNumber();


let start =
latest - 50000;


let step =
9000;


let transactions =
new Set();

let tokens =
new Set();

let partners =
new Map();


let firstBlock=null;
let lastBlock=null;



for(
let from=start;
from<=latest;
from+=step
){

let to =
Math.min(
from+step-1,
latest
);


console.log(
`Scanning ${from}-${to}`
);



let logs=[];



// FROM wallet

let a =
await provider.getLogs({

fromBlock:from,
toBlock:to,

topics:[
TRANSFER,
ethers.zeroPadValue(wallet,32)
]

});



// TO wallet

let b =
await provider.getLogs({

fromBlock:from,
toBlock:to,

topics:[
TRANSFER,
null,
ethers.zeroPadValue(wallet,32)
]

});


logs=[
...a,
...b
];



for(
const log of logs
){


transactions.add(
log.transactionHash
);


tokens.add(
log.address.toLowerCase()
);



if(
!firstBlock ||
log.blockNumber < firstBlock
)
firstBlock =
log.blockNumber;



if(
!lastBlock ||
log.blockNumber > lastBlock
)
lastBlock =
log.blockNumber;



for(
const topic of log.topics.slice(1,3)
){

if(!topic)
continue;


let addr =
"0x"+
topic.slice(26);


addr =
addr.toLowerCase();


if(addr!==wallet){

partners.set(
addr,
(partners.get(addr)||0)+1
);

}

}


}


}



let firstActivity=null;
let lastActivity=null;


if(firstBlock){

let b1 =
await provider.getBlock(firstBlock);


let b2 =
await provider.getBlock(lastBlock);


firstActivity =
new Date(
Number(b1.timestamp)*1000
);


lastActivity =
new Date(
Number(b2.timestamp)*1000
);

}



let balance =
await provider.getBalance(wallet);



 let score = 0;

if (transactions.size > 20)
score += 30;

if (tokens.size > 3)
score += 20;

if (partners.size > 10)
score += 20;

if (firstActivity)
score += 20;

if (score > 100)
score = 100;


let label =
score >= 80
? "Trusted User"
:
score >= 50
? "Active User"
:
"New Wallet";



let topPartners =
[
...partners.entries()
]
.sort(
(a,b)=>b[1]-a[1]
)
.slice(0,5);



let report={


identityEngine:
"Sovereign Identity Engine V5",


identity:{

wallet,
network:"Base"

},



activity:{

transactions:
transactions.size,

tokens:
tokens.size,

firstActivity,

lastActivity

},



portfolio:{

ETH:
ethers.formatEther(balance)

},



graph:{

uniqueConnections:
partners.size,

topPartners

},



reputation:{

score,

label,

sybilRisk:
100-score

},



scannedBlocks:{

from:start,

to:latest

}


};



console.log(
JSON.stringify(
report,
null,
2
)
);


return report;


}




