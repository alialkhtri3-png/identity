const logs = [];


export function addAuditLog(
    orgId,
    action,
    actor
){

    const log = {

        id:
        "log-" + Date.now(),

        orgId,

        action,

        actor,

        timestamp:
        new Date().toISOString()

    };


    logs.push(log);

    return log;

}



export function getAuditLogs(orgId){

    return logs.filter(
        log => log.orgId === orgId
    );

}
