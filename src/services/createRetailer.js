const Retailer = require("../models/retailer")
const {cpfValidate} = require("./utils")
const logger = require("../logger/index")

const createRetailer = async (body) => {
    const {name, lastName,cpf,email,password } = body
    const cpfIsTrue = cpfValidate(body.cpf)    
    if(cpfIsTrue.error){
        return { error: cpfIsTrue.error}
    }
    const retailer = await new Retailer({name, lastName, cpf:cpfIsTrue, email, password}).save();

    logger.debug("Create Retailer: %j", retailer)

    if(!retailer){
        logger.error("O cadastro não foi concluído: %j", retailer)
        return { error: "O cadastro não foi concluído" } 
    }
 
    return { data: `Olá ${body.name} ${body.lastName} seu cadastro foi concluído com sucesso!` }
};

module.exports = { createRetailer }