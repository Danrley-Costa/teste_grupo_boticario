const Retailer = require("../models/retailer")
const { createToken } = require('./utils')

const authClient = async(user, password) => {
    const retailer = await Retailer.findOne({user, password});

    if(!retailer){
        return { error: { message: 'Usuario ou senha invalido!'}}
    }
    if(user === retailer.name && password === retailer.password){
        const token = createToken(retailer._id)
        return { data:token }
    }
    return { error: { message: 'Usuario ou senha invalido!'}}
}


module.exports = {authClient}