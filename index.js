const process=require("process");

Promise.prototype.timeOut=(e=1e3)=>new Promise((t,o)=>setTimeout(t,e));
Promise.prototype._immediateFn=(e)=>process.nextTick(e);

Date.prototype.utc = {};
Object.defineProperties(Date.prototype.utc,{hr:{get:()=>(new Date).getUTCHours()},date:{get:()=>(new Date).getUTCDate()},month:{get:()=>(new Date).getUTCMonth()},min:{get:()=>(new Date).getUTCMinutes()},sec:{get:()=>(new Date).getUTCSeconds()},year:{get:()=>(new Date).getUTCFullYear()},millisec:{get:()=>(new Date).getUTCMilliseconds()}});

globalThis.fileDate=((e=!1,t=!1)=>{const o=new Date;return t?o.toISOString():e?`${o.getUTCFullYear()}-${o.getUTCMonth()+1}-${o.getUTCDate()}-${o.getUTCHours()}-${o.getUTCMinutes()}-${o.getUTCSeconds()}-${o.getUTCMilliseconds()}`:`${o.getFullYear()}-${o.getMonth()+1}-${o.getDate()}-${o.getHours()}-${o.getMinutes()}-${o.getSeconds()}-${o.getMilliseconds()}`});