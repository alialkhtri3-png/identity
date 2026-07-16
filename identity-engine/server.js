import express from "express";
import cors from "cors";

import { gateway } from "./saas/gateway.js";
import { usageMiddleware } from "./saas/usageMiddleware.js";
import { adminRoutes } from "./saas/enterprise/adminRoutes.js";


const app = express();

const PORT = 3001;


app.use(cors());

app.use(express.json());


// SaaS Layer
app.use("/api/v1", gateway);

app.use(usageMiddleware);


// Enterprise Layer
app.use("/api/admin", adminRoutes);


// Health
app.get("/", (req,res)=>{

    res.json({

        name:"Sovereign Identity Engine",

        version:"V8.2 Enterprise",

        status:"running",

        timestamp:new Date().toISOString()

    });

});


// SaaS Status
app.get("/api/v1/status",(req,res)=>{

    res.json({

        SaaS:"active",

        version:"V8.2",

        tenant:req.tenant || null,

        usage:req.usage || null,

        timestamp:new Date().toISOString()

    });

});


app.listen(PORT,()=>{

    console.log(
        `Sovereign Identity Engine V8.2 Enterprise running on ${PORT}`
    );

});
