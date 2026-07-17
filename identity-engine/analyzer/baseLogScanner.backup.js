import { ethers } from "ethers";


const provider =
new ethers.JsonRpcProvider(
    "https://mainnet.base.org"
);


// ERC20 Transfer Event
const TRANSFER_TOPIC =
ethers.id(
    "Transfer(address,address,uint256)"
);



export async function scanBaseLogs(wallet){


    if(!ethers.isAddress(wallet)){

        throw new Error(
            "Invalid wallet address"
        );

    }



    const address =
        wallet.toLowerCase()
        .replace(
            "0x",
            ""
        );



    const paddedAddress =
        "0x" +
        address.padStart(
            64,
            "0"
        );



    const latestBlock =
        await provider.getBlockNumber();



    // آخر 5000 بلوك كبداية
    const fromBlock =
        latestBlock - 5000;



    let logs=[];


    try{


        logs =
        await provider.getLogs({

            fromBlock,

            toBlock:
                latestBlock,


            topics:[

                TRANSFER_TOPIC,

                null,

                [
                    paddedAddress
                ]

            ]

        });



    }catch(error){


        console.log(
            "Base log scan error:",
            error.message
        );


        logs=[];

    }




    return {


        wallet,


        blocksScanned:
        latestBlock-fromBlock,


        transfers:
        logs.length,


        contracts:
        [
            ...new Set(
                logs.map(
                    x=>x.address
                )
            )
        ],


        latestBlock,


        rawLogs:logs.map(log=>({

            contract:
            log.address,

            topics:
            log.topics

        }))


    };


}
