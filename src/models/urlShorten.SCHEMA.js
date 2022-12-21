import joi from 'joi';

const urlShortenSchema = joi.object({
    url: joi.string().uri().required()
})

export default urlShortenSchema