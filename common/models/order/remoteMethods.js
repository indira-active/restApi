module.exports = function(Order){

    Order.remoteMethod(
        "shopifyOrderCreationWebhook",
        {
            description: "this is the method that accepts and handles the order creation webhook from shopify",
            accepts:{ arg: 'orderData', type: 'object', http: { source: 'body' } }
        }
    )
}