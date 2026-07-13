import { ethers } from "ethers";
import axios from "axios";

const provider = new ethers.JsonRpcProvider(
  "https://mainnet.base.org"
);

const API_KEY = process.env.ETHERSCAN_API_KEY;

export async function analyzeWallet(address){

  try {

    const checksum = ethers.getAddress(address);

    const balanceWei =
      await provider.getBalance(checksum);

    const balance =
      ethers.formatEther(balanceWei);

    const latestBlock =
      await provider.getBlockNumber();

    let transactions = 0;
    let firstActivity = null;
    let lastActivity = null;


    if(API_KEY){

      const url =
      `https://api.etherscan.io/v2/api?chainid=8453&module=account&action=txlist&address=${checksum}&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`;


      const response = await axios.get(url);


      if(response.data.status === "1"){

        const txs = response.data.result;

        transactions = txs.length;


        if(txs.length > 0){

          firstActivity =
          new Date(
            Number(txs[0].timeStamp) * 1000
          ).toISOString();


          lastActivity =
          new Date(
            Number(txs[txs.length-1].timeStamp) * 1000
          ).toISOString();

        }


      } else {

        console.log(
          "Etherscan:",
          response.data.result
        );

      }

    }


    return {

      wallet: checksum,

      network:"Base",

      balance,

      transactions,

      block:latestBlock,

      chains:[
        "Base"
      ],

      firstActivity,

      lastActivity

    };


  } catch(error){

    return {

      wallet:address,

      network:"Base",

      balance:"0",

      transactions:0,

      chains:[],

      error:error.message

    };

  }

}
