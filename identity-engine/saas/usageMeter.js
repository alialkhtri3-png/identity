// SaaS Usage Meter V8.1

const usage = {};

function recordUsage(tenantId, action="scan") {

    if(!usage[tenantId]){
        usage[tenantId] = {
            scans:0,
            apiCalls:0
        };
    }

    if(action === "scan"){
        usage[tenantId].scans++;
    }

    if(action === "api"){
        usage[tenantId].apiCalls++;
    }

    return usage[tenantId];
}


function getUsage(tenantId){

    return usage[tenantId] || {
        scans:0,
        apiCalls:0
    };

}


module.exports = {
    recordUsage,
    getUsage
};
