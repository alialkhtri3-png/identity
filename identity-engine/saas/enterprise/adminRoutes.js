import express from "express";

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


// Create Organization
adminRoutes.post("/organizations",(req,res)=>{

    const {name}=req.body;


    const org =
    createOrganization(name);


    addAuditLog(
        org.id,
        "CREATE_ORGANIZATION",
        "admin"
    );


    res.json(org);

});


// List Organizations
adminRoutes.get("/organizations",(req,res)=>{

    res.json(
        getOrganizations()
    );

});


// Add Member
adminRoutes.post("/members",(req,res)=>{


    const {
        orgId,
        wallet,
        role
    }=req.body;


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


// Organization Members
adminRoutes.get(
"/members/:orgId",
(req,res)=>{


    res.json(
        getMembers(
            req.params.orgId
        )
    );


});


// Audit Logs

adminRoutes.get(
"/audit/:orgId",
(req,res)=>{


    res.json(
        getAuditLogs(
            req.params.orgId
        )
    );


});
