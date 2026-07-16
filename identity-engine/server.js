import "dotenv/config";
import express from "express";
import cors from "cors";

import {
  analyzeWallet
} from "./analyzer/walletAnalyzer.js";

import {
  createDID
} from "./did/didBuilder.js";


const app = express();


app.use(cors({
  origin:"*"
}));

app.use(express.json());



// Health Check
app.get("/", (req,res)=>{

    res.json({

        name:"Sovereign Identity Engine",

        version:"V6.3",

        status:"online",

        network:"Base",

        modules:[

            "DID",

            "BaseIndexer",

            "ActivityAnalyzer",

            "TokenScanner",

            "GraphBuilder",

            "SybilDetector",

            "ReputationEngine"

        ]

    });

});




// Identity Analysis
app.post("/identity", async(req,res)=>{


try{


    const walletAddress =
        req.body.wallet ||
        req.body.address;



    if(!walletAddress){

        return res.status(400).json({

            error:"wallet address required"

        });

    }



    const wallet =
        await analyzeWallet(walletAddress);



    const did =
        createDID(walletAddress);



    res.json({

        verified:true,


        identity:{

            wallet:walletAddress,

            did

        },


        wallet


    });



}
catch(error){


    console.error(error);


    res.status(500).json({

        error:error.message

    });


}


});






// Dashboard API
app.get("/api/identity/:wallet", async(req,res)=>{


try{


    const wallet =
        await analyzeWallet(
            req.params.wallet
        );


    const did =
        createDID(
            req.params.wallet
        );



    res.json({

        wallet:req.params.wallet,

        identity:{

            did

        },

        walletData:wallet


    });


}
catch(error){


    res.status(500).json({

        error:error.message

    });


}


});






app.listen(3001,()=>{


console.log(

"Sovereign Identity Engine V6.3 running on 3001"

);


});
