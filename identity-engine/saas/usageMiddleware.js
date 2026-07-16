import { trackUsage } from "./usageMeter.js";


export function usageMiddleware(req,res,next){


    if(!req.tenant){

        return res.status(401).json({
            error:"Tenant required"
        });

    }


    const usage =
        trackUsage(
            req.tenant.tenantId
        );


    req.usage = usage;


    next();

}
