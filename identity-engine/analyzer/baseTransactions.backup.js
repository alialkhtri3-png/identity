import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
    "https://mainnet.base.org"
);


export async function scanBaseTransactions(wallet){

    const latestBlock =
        await provider.getBlockNumber();


    const startBlock =
        latestBlock - 50000;


    let transactions = 0;
    let contracts = new Set();

    let firstSeen = null;
    let lastActive = null;


    for(
        let blockNumber = startBlock;
        blockNumber <= latestBlock;
        blockNumber += 500
    ){

        try{

            const block =
                await provider.getBlock(
                    blockNumber,
                    true
                );


            if(
                !block ||
                !block.prefetchedTransactions
            ) continue;


            for(
                const tx of block.prefetchedTransactions
            ){

                if(
                    tx.from &&
                    tx.from.toLowerCase()
                    === wallet.toLowerCase()
                ){

                    transactions++;


                    if(tx.to){
                        contracts.add(tx.to);
                    }


                    if(!firstSeen)
                        firstSeen = blockNumber;


                    lastActive = blockNumber;

                }


            }


        }catch(e){

            continue;

        }

    }


    return {

        wallet,

        latestBlock,

        transactions,

        contractsUsed:
            contracts.size,

        contracts:
            [...contracts],

        firstSeen,

        lastActive,

        scannedBlocks:
            50000

    };

}


// compatibility export
export const scanTransactions =
    scanBaseTransactions;
