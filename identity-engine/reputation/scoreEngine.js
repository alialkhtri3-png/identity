export function calculateScore(data){

 let score = 0;

 if(data.transactions > 100)
   score += 50;

 if(data.transactions > 500)
   score += 30;


 let role = "New Wallet";

 if(score > 70)
   role = "Active User";


 return {

   activityScore: score,

   sybilScore:
      score > 50 ? 5 : 30,

   role

 };

}
