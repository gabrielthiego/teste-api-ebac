const Joi = require('joi');

const usuarioContrato = Joi.object({
  nome: Joi.string().required(),          
  email: Joi.string().email().required(), 
  password: Joi.string().required(),      
  administrador: Joi.boolean().required(),
  _id: Joi.string().required(),           
  __v: Joi.number().optional()            
});

export default usuarioContrato;
