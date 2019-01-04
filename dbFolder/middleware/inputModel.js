import Joi from 'joi';


const newUserSchema = Joi.object().keys({
  firstName: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .required()
    .label('A valid first name '),
  lastName: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .required()
    .label('A valid last name'),
  email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().max(50)
    .required()
    .label('A valid email'),
  phone: Joi.number().integer().required().label('A valid phone number'),
  address: Joi.string().required().label('A valid address'),
  password: Joi.string().alphanum().min(3).max(1000)
    .required()
    .label('A valid password')
});

const loginSchema = {
  email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().max(50)
    .required()
    .label('A valid email'),
  password: Joi.string().alphanum().min(3).max(1000)
    .required()
    .label('A valid password')
};

export { newUserSchema, loginSchema };
