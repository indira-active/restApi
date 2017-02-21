//this will ideally become a seperate module dedicated to fromating shopify data
function formatShopifyOrderData(orderData){

    orderData.order_id = orderData.id;

    delete orderData.id

    return   orderData;
}

module.exports = function(Order){

    return function(orderData, cb){

            let order = formatShopifyOrderData(orderData);

            //create method creates and stores a new model instance in the mongo db
            Order.create(order, (err, inst)=>{

                if(err){
                    console.log(err);
                    
                    //not really sure what the webhook wants in response so plan for cb
                    if(typeof cb === 'function')
                        return cb(err)
                }

                if(typeof cb === 'function')
                    return cb(null, inst);
            });
    }
}