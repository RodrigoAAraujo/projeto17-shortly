import joi from 'joi';

const signupSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().min(4).required(),
    password: joi.string().min(4).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required().strict()
})

export default signupSchema