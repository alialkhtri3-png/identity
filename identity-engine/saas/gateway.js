// SaaS Gateway Middleware V8.1

const {
    validateKey
} = require("./apiKeys");

const {
    getTenant
} = require("./tenantManager");

const {
    recordUsage
} = require("./usageMeter");


function saasGateway(req,res,next){

    const key =
    req.headers["x-api-key"];


    if(!key){
        return res.status(401).json({
            error:"Missing API Key"
        });
    }


    const tenant =
    validateKey(key);


    if(!tenant){
        return res.status(403).json({
            error:"Invalid API Key"
        });
    }


    const account =
    getTenant(tenant);


    if(!account){
        return res.status(404).json({
            error:"Tenant not found"
        });
    }


    recordUsage(
        tenant,
        "api"
    );


    req.tenant = account;


    next();

}


module.exports = saasGateway;
