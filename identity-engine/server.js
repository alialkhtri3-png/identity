import express from "express";
import cors from "cors";

import { gateway } from "./saas/gateway.js";
import { usageMiddleware } from "./saas/usageMiddleware.js";


const app = express();

const PORT = 3001;


app.use(cors());
app.use(express.json());


// SaaS Security Layer
app.use("/api/v1", gateway);
app.use("/api/v1", usageMiddleware);


// Health Check
app.get("/", (req,res)=>{

    res.json({

        name:"Sovereign Identity Engine",

        version:"V8.1 SaaS",

        status:"running",

        timestamp:new Date().toISOString()

    });

});


// SaaS Status
app.get("/api/v1/status",(req,res)=>{

    res.json({

        SaaS:"active",

        version:"V8.1",

        tenant:req.tenant || null,

        usage:req.usage || null,

        timestamp:new Date().toISOString()

    });

});


// Error Handler
app.use((err,req,res,next)=>{

    console.error(err);

    res.status(500).json({

        error:"Internal Server Error"

    });

});


app.listen(PORT,()=>{

    console.log(
        `Sovereign Identity Engine V8.1 SaaS running on ${PORT}`
    );

});
