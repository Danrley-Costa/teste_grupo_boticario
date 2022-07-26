const ajv = require("./ajv-instance")

saleSchema = {
    "type": "object",
    "properties": {
      "idProduct": {type:"number", format:"int32"},
      "price": {type:"number", format:"int32"},
      "cpf": {type: "string"}
    },
    "required": ["idProduct","price","cpf"],
    "additionalProperties": false
  }

  
module.exports = ajv.compile(saleSchema)