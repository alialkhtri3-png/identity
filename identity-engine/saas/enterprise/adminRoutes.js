import express from "express";

import {
    adminAuth
} from "./adminAuth.js";


import {
    requirePermission
} from "./rbacMiddleware.js";


import {
    createOrganization,
    getOrganizations
} from "./organizations.js";


import {
    addMember,
    getMembers
} from "./members.js";


import {
    addAuditLog,
    getAuditLogs
} from "./auditLogs.js";



export const adminRoutes = express.Router();


// Enterprise Authentication
adminRoutes.use(adminAuth);



// ===============================
// Organizations
// ===============================


adminRoutes.post(
"/organizations",
requirePermission("ORG_CREATE"),
(req,res)=>{


    const {
        name
    } = req.body;


    const org =
    createOrganization(name);



    addAuditLog(
        org.id,
        "CREATE_ORGANIZATION",
        req.user.apiKey
    );



    res.json(org);


});




adminRoutes.get(
"/organizations",
requirePermission("AUDIT_VIEW"),
(req,res)=>{


    res.json(
        getOrganizations()
    );


});





// ===============================
// Members
// ===============================



adminRoutes.post(
"/members",
requirePermission("MEMBER_ADD"),
(req,res)=>{


    const {
        orgId,
        wallet,
        role
    } = req.body;



    const member =
    addMember(
        orgId,
        wallet,
        role
    );



    addAuditLog(
        orgId,
        "ADD_MEMBER",
        wallet
    );



    res.json(member);


});





adminRoutes.get(
"/members/:orgId",
requirePermission("AUDIT_VIEW"),
(req,res)=>{


    res.json(

        getMembers(
            req.params.orgId
        )

    );


});






// ===============================
// Audit Logs
// ===============================


adminRoutes.get(
"/audit/:orgId",
requirePermission("AUDIT_VIEW"),
(req,res)=>{


    res.json(

        getAuditLogs(
            req.params.orgId
        )

    );


});
