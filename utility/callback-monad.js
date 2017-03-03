class Callback {
    constructor(f) {
        
        // this.run = f
        this.run = callback => {
            try {
                f(callback)
            } catch (ex) {
                callback(ex, null)
            }
        }
        
    }
    
    // this :: Callback x
    // (x -> y) -> Callback y
    map(g){

        return new Callback(callback => {
            this.run((error, ...result) => {
                if(!!error) {
                    callback(error, null)
                } else {
                    g(...result).run(callback)
                }
            })
        })
    }

    // this :: Callback x
    // (x -> Callback y) -> Callback y
    bind(g){
        
        return new Callback(callback => {
            this.run((error, ...result) => {
                if(!!error) {
                    callback(error, null)
                } else {
                    g(...result).run(callback)
                }
            })
        })
    }


    // this :: Callback x
    // x -> (y || Callback y) -> Callback y
    then(g){

        return new Callback(callback => {
            this.run((error, ...result) => {
                if(!!error) {
                callback(error, null)
                } else {
                    try {
                        const y = g(...result)
                        if (y instanceof Callback) {
                            y.run(callback)
                        }
                        //handle promise
                        else if(typeof y.then === 'function'){
                            y.then(res => callback(null,res)).catch(err => callback(err))
                        
                        }else{
                            callback(null,y)
                        }
                           
                    } catch(ex) {
                        callback(ex, null) 
                    }
                }
            })
        })
    }

    bindTo(g){
        return this.bind(Callback.from(g))
    }

    // x -> Callback x
    static pure(x){
        return new Callback(cb => cb(null, x))
    }

    // Callback.from casts f into a Callback instance, where
    // f is a function that takes x and a callback function
    static makeCallback(f){
        return (...x) => new Callback(cb => f(...x, cb))
    }

}


//keep similar syntax to promises
Callback.resolve = Callback.pure

module.exports = Callback;