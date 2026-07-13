import {useState} from "react";
import "./App.css";

const API="http://localhost:3001";

export default function App(){

const [data,setData]=useState(null);

async function verify(){

try{

const res=await fetch(API+"/identity",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

address:
"0x8eDC55D94cb1Ad95A7A35B0fF66aE77612A07E64",

message:
"Login to Identity Engine",

signature:
"0x3834fb004e8e9b7ef39d914435158d3ec55c1bd788b2d9a0072756e81e6d9fa53147e2b3975ea18057a6ad88ab7c62a86054c3c0861513a2de88abc87f2e45b11c"

})

});


const json=await res.json();

setData(json);


}catch(e){

setData({
error:e.message
});

}

}


return (

<div className="dashboard">

<h1>
🔐 Sovereign Identity Dashboard
</h1>


<button onClick={verify}>
Verify Wallet
</button>


{data &&

<div className="card">

<h2>
Identity Result
</h2>

<pre>
{JSON.stringify(data,null,2)}
</pre>

</div>

}


</div>

)

}
