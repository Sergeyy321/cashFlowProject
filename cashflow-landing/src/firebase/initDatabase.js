import {doc,setDoc} from "firebase/firestore";

import {db} from "./FireBase";



export async function createInitialData(){


await setDoc(
doc(db,"settings","main"),

{

event:{

city:"Warszawa",

date:"27 lipca",

time:"18:00",

place:"Business Hub Warsaw",

spots:6

},


prices:{

test:120,

combo:150

},


siteTexts:{

title:"Cashflow Game",

subtitle:"Игра для развития финансового мышления"

}

}

);


console.log("Database created");

}