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

const idSchema = {
  id: Joi.number().integer().required().label('valid Id')
};
const userIdSchema = {
  userId: Joi.number().integer().required().label('valid userId')
};

const newOrderSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).lowercase().label('Enter a valid email'),
  weight: Joi.number().required().label('Enter a valid weight'),
  parcelContent: Joi.string().min(3).max(100).regex(/[a-zA-Z]*$/)
    .required()
    .label('Enter a valid parcel content description'),
  price: Joi.number().integer().min(100).max(100000)
    .required()
    .label('Enter a valid price'),
  quantity: Joi.number().integer().min(1).max(10)
    .required()
    .label('Enter a valid quantity'),
  pickupAddress: Joi.string().required().label('Enter a valid pickup address'),
  senderPhone: Joi.number().integer().required().label('Enter a valid sender phone number'),
  senderName: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .required()
    .label('A valid sender name'),
  receiverName: Joi.string().min(3).max(100).regex(/^[a-zA-Z]*$/)
    .required()
    .label('A valid receiver name'),
  destinationAddress: Joi.string().min(3).max(100).required()
    .label('Enter a valid destination'),
  receiverPhone: Joi.number().integer().required().label('Enter a valid receiver phone')
});


export {
  newUserSchema, loginSchema, idSchema, userIdSchema, newOrderSchema
};
