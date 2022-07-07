import joi from "joi";

export const validatePost= joi.object({
    firstUser: joi.string().required(),
    secondUser: joi.string().required()
});
