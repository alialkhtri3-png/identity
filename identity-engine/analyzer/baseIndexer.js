import { ethers } from "ethers";


const provider = new ethers.JsonRpcProvider(
  "https://mainnet.base.org"
);



export async function getBaseWalletData(wallet){

    if(!ethers.isAddress(wallet)){
        throw new Error("Invalid wallet address");
    }


    // Balance
    const balance =
        await provider.getBalance(wallet);



    // Current block
    const blockNumber =
        await provider.getBlockNumber();



    return {

        network:"Base",

        wallet,

        balance:{
            eth: ethers.formatEther(balance)
        },


        activity:{

            transactions:0,

            firstSeen:null,

            lastActive:null,

            note:
            "Base RPC only - add indexer for history"

        },


        tokens:[],


        graph:{

            nodes:[],

            edges:[]

        },


        chain:{

            chainId:8453,

            latestBlock:blockNumber

        }

    };

}
