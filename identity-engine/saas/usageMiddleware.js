import { trackUsage } from "./usageMeter.js";
import { getPlan } from "./billing.js";


export function usageMiddleware(req,res,next){

    const tenant = req.tenant;


    if(!tenant){
        return res.status(401).json({
            error:"Tenant missing"
        });
    }


    const usage =
    trackUsage(
        tenant.tenantId
    );


    const plan =
    getPlan("enterprise");


    if(
        usage.requests >
        plan.requests
    ){

        return res.status(429).json({

            error:"Usage limit exceeded",

            usage,

            limit:plan.requests

        });

    }


    req.usage = usage;

    next();

}
