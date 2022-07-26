const ajv = require("./ajv-instance")

retailerSchema = {
    "type": "object",
    "properties": {
      "name": {type: "string"},
      "lastName": {type: "string"},
      "cpf": {type: "string"},
      "email": {type: "string", format: "email"},
      "password":{type: "string" , format:"password"}
    },
    "required": ["name","lastName","cpf","email","password"],
    "additionalProperties": false
  }

  
module.exports = ajv.compile(retailerSchema)