import express from "express";

import {
  verifyWalletSignature
} from "./auth/verifySignature.js";

import {
  analyzeWallet
} from "./analyzer/walletAnalyzer.js";

import {
  calculateScore
} from "./reputation/scoreEngine.js";

import {
  createDID
} from "./did/didBuilder.js";


const app = express();

app.use(express.json());


// Health Check
app.get("/", (req,res)=>{

  res.json({

    name:"Identity Engine",

    version:"v1.0",

    status:"online",

    description:
    "Web3 Wallet Intelligence & Reputation Protocol",

    modules:[

      "Signature Verification",

      "Wallet Analyzer",

      "Reputation Engine",

      "DID Builder"

    ]

  });

});


// Identity Endpoint
app.post("/identity", async(req,res)=>{

try {


const {
address,
message,
signature
}=req.body;


// Verify ownership

const verified =
verifyWalletSignature(
address,
message,
signature
);


if(!verified){

return res.status(401)
.json({

error:"Invalid wallet signature"

});

}


// Analyze wallet

const wallet =
await analyzeWallet(address);


// Reputation

const reputation =
calculateScore(wallet);


// DID

const did =
createDID(address);



res.json({

verified:true,


identity:{

wallet:address,

did

},


wallet,


reputation


});


}catch(error){

res.status(500).json({

error:error.message

});

}


});



// Start Server

app.listen(3001,()=>{

console.log(
"Identity Engine running on 3001"
);

});
