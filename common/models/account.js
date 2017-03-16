'use strict';
//import all the methods for the order model, the remotemethod declarations, and the observation hooks
const remoteMethods = require("./account/remoteMethods");
const observe = require("./account/observe");
const Methods = require("./account/order-methods");

module.exports = function(Account) {

    let methods = Methods(Account);
   
    //assign all the methods in account-methods.js to the Account model 
    for(let m in methods)
        Account[m] = methods[m];
    
    //declare the remote methods for the Account model
    remoteMethods(Account);

    //declare the observation methods for the Account model
    observe(Account);
};
