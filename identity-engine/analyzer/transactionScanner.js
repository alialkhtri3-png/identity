import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
 "https://mainnet.base.org"
);

const TRANSFER =
"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";


export async function scanTransactions(wallet){

 wallet = wallet.toLowerCase();

 const latest =
 await provider.getBlockNumber();

 const start =
 latest - 100000;


 const step = 5000;

 const txs = new Set();


 const topicWallet =
 ethers.zeroPadValue(
  wallet,
  32
 );


 for(
  let from=start;
  from<latest;
  from+=step
 ){

  const to =
  Math.min(
   from+step-1,
   latest
  );


  console.log(
   `Scanning ${from}-${to}`
  );


  try{


   const sent =
   await provider.getLogs({

    fromBlock:from,
    toBlock:to,

    topics:[
     TRANSFER,
     topicWallet
    ]

   });



   const received =
   await provider.getLogs({

    fromBlock:from,
    toBlock:to,

    topics:[
     TRANSFER,
     null,
     topicWallet
    ]

   });



   [
    ...sent,
    ...received
   ].forEach(log=>{

    txs.add(
     log.transactionHash
    );

   });


  }catch(err){

   console.log(
    "RPC block range failed",
    from,
    to
   );

  }

 }


 return {

  transactions:
  txs.size,

  scannedBlocks:
  latest-start

 };

}
