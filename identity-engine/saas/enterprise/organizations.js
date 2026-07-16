const organizations = [];


export function createOrganization(name){

    const org = {

        id:
        "org-" + Date.now(),

        name,

        createdAt:
        new Date().toISOString()

    };


    organizations.push(org);

    return org;

}


export function getOrganizations(){

    return organizations;

}
