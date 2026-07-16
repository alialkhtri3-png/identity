import { ethers } from "ethers";


const provider =
new ethers.JsonRpcProvider(
"https://mainnet.base.org"
);



export async function scanTransactions(wallet){


    const latestBlock =
    await provider.getBlockNumber();



    return {

        wallet,

        latestBlock,

        transactions:0,

        contractsUsed:0,

        firstSeen:null,

        lastActive:null,

        note:
        "Need Base indexer for historical logs"

    };


}
