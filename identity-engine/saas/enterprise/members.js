const members = [];


export function addMember(orgId,wallet,role="viewer"){


    const member = {

        id:
        "member-" + Date.now(),

        orgId,

        wallet,

        role,

        createdAt:
        new Date().toISOString()

    };


    members.push(member);


    return member;

}



export function getMembers(orgId){

    return members.filter(
        m=>m.orgId===orgId
    );

}
