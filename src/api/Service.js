import http from "./http";



const getMainData =(pid,tid) => {
 
return http.get(`/?pid=${pid}&sid=${tid}`)
};


export default {
  
    getMainData


};