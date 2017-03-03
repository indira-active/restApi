module.exports = (err, res, cb) =>{

    if(err)
        return cb(err)
    
    return cb(null, res)   
}