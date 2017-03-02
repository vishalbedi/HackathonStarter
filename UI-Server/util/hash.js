/**
 * Created by vishal on 12/10/16.
 */
'use strict';


let getServerId = (email, totalServers)=>{
    let sum = 0;
    for (let i = 0; i< email.length; i++){
        sum += email.charCodeAt(i);
    }
    return sum % totalServers;
};


module.exports = getServerId;
