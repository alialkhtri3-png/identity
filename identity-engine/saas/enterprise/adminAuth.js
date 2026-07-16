export function adminAuth(
req,
res,
next
){


    const apiKey =
    req.headers["x-api-key"];



    if(!apiKey){

        return res.status(401).json({

            error:"API Key Required"

        });

    }



    req.user={

        role:"OWNER",

        apiKey

    };



    next();

}
