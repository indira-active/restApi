module.exports = function(Order){

    let Methods = {};

    Methods.shopifyOrderCreationWebhook = require("./shopifyOrderCreationWebhook")(Order);
    
    return Methods;
}