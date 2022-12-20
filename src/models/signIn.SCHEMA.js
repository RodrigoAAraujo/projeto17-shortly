import joi from 'joi';

const signinSchema = joi.object({
    email: joi.string().min(4).required(),
    password: joi.string().min(4).required(),
})

export default signinSchema