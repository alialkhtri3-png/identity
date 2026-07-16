import { ethers } from "ethers";

import { getBaseWalletData } from "./baseIndexer.js";
import { analyzeActivity } from "./baseActivity.js";
import { scanTokens } from "./tokenScanner.js";
import { buildGraph } from "./graphBuilder.js";
import { detectSybil } from "./sybilDetector.js";
import { calculateReputation } from "../reputation/reputationEngine.js";
import { scanTransactions } from "./baseTransactions.js";
import { calculateWalletAge } from "./walletAge.js";
import { scanBaseLogs } from "./baseLogScanner.js";


export async function analyzeWallet(wallet){


    if(!ethers.isAddress(wallet)){
        throw new Error("Invalid wallet address");
    }
const ContractAnalyzer =
require("./contractAnalyzer");
const contractAnalyzer =
new ContractAnalyzer();


const contracts =
contractAnalyzer.analyze(
activity.transactions
);


    const base =
        await getBaseWalletData(wallet);



    const activity =
        await analyzeActivity(wallet);



    const transactions =
        await scanTransactions(wallet);



    const logs =
        await scanBaseLogs(wallet);



    const age =
        calculateWalletAge(transactions);



    const tokens =
        await scanTokens(wallet);



    const graph =
        buildGraph({
            wallet
        });



    const finalActivity = {

        ...activity,

        ...transactions,

        ...age,


        transfers:
            logs.transfers,


        contractsUsed:
            logs.contracts.length,


        logBlocks:
            logs.blocksScanned

    };



    const reputation =
        calculateReputation({

            activity: finalActivity,

            tokens: tokens.tokens,

            graph

        });



    const sybil =
        detectSybil({

            activity: finalActivity,

            tokens: tokens.tokens

        });



    return {


        wallet,


        network:"Base",


        balance:
            base.balance,


        activity:
            finalActivity,


        tokens:
            tokens.tokens,


        graph,


        reputation,


        sybil,


        chain:{

            chainId:8453,

            latestBlock:
                base.chain.latestBlock

        },

contracts
        engine:{

            version:"V6.5",

            modules:[

                "BaseIndexer",

                "TransactionScanner",

                "BaseLogScanner",

                "WalletAge",

                "ActivityAnalyzer",

                "TokenScanner",

                "GraphBuilder",

                "SybilDetector",

                "ReputationEngine"

            ]

        }


    };

}
