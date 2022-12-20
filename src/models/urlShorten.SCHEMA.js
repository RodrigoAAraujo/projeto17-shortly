import joi from 'joi';

const urlShortenSchema = joi.object({
    url: joi.string().required()
})

export default urlShortenSchema