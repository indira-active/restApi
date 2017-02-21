'use strict';

//import all the methods for the order model, the remotemethod declarations, and the observation hooks
const remoteMethods = require("./order/remoteMethods");
const observe = require("./order/observe");
const Methods = require("./order/order-methods");

module.exports = function(Order) {

    let methods = Methods(Order);
   
    //assign all the methods in order-methods.js to the Order model 
    for(let m in methods)
        Order[m] = methods[m];
    
    //declare the remote methods for the Order model
    remoteMethods(Order);

    //declare the observation methods for the Order model
    observe(Order);

};
