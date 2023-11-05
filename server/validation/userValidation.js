const joi = require("joi");
const asyncHandler = require("../utils/asyncHandler");

exports.signUpValidation = asyncHandler(async (req, res, next) => {
    const signUpSchemaJoi = joi.object({

        username: joi.string().trim().required().alphanum().min(3).max(15).messages({
            'string.alphanum': 'Name must only contain alphanumeric characters',
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name must be no more than 15 characters long',
            'string.empty': 'Name is a required field'
        }),
        password: joi.string().required().min(8).pattern(new RegExp("^[a-zA-Z0-9]{8,64}$"))
            .messages({
                'string.min': "password must be at least 8 characters",
                'string.pattern.base': "invalid password"
            }),

    repeatPassword: joi.valid(joi.ref('password')).messages({
        'any.only': 'Passwords do not match'
    }),

        email: joi.string().required().trim().email({ minDomainSegments: 2 }).messages({
            'string.email': 'Please enter a valid email address',
            'string.empty': 'Email is a required field'
        })
    });

    const value = await signUpSchemaJoi.validateAsync(req.body, { abortEarly: false });
    if (value) return next()
});

exports.signInValidation = asyncHandler(async (req, res, next) => {
    const signInSchemaJoi = joi.object({

        password: joi.string().required().min(8).max(64).pattern(new RegExp("^[a-zA-Z0-9]{8,64}$"))
            .messages({
                'string.min': "password must be at least 8 characters",
                'string.pattern.base': "invalid password"
            }),


        email: joi.string().required().trim().email({ minDomainSegments: 2 }).messages({
            'string.email': 'Please enter a valid email address',
            'string.empty': 'Email is a required field'
        })
    });

    const value = await signInSchemaJoi.validateAsync(req.body, { abortEarly: false });
    if (value) return next()
})

exports.updateProfileValidation = asyncHandler(async (req, res, next) => {
    const updateProfileSchemaJoi = joi.object({

        username: joi.string().trim().alphanum().min(3).max(15).optional().messages({
            'string.alphanum': 'Name must only contain alphanumeric characters',
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name must be no more than 15 characters long',
        }),

        image: joi.any().optional()


    });

    const value = await updateProfileSchemaJoi.validateAsync(req.body, { abortEarly: false });
    if (value) return next()
})

exports.changePasswordValidation = asyncHandler(async (req, res, next) => {
    const changePasswordSchemaJoi = joi.object({

        currentPassword: joi.string().required().min(8).pattern(new RegExp("^[a-zA-Z0-9]{8,64}$"))
            .messages({
                'string.min': "password must be at least 8 characters",
                'string.pattern.base': "invalid password"
            }),

        newPassword: joi.string().required().min(8).pattern(new RegExp("^[a-zA-Z0-9]{8,64}$"))
            .messages({
                'string.min': "password must be at least 8 characters",
                'string.pattern.base': "invalid password"
            }),

        repeatNewPassword: joi.valid(joi.ref('password')).messages({
            'any.only': 'Passwords do not match'
        }),

    });

    const value = await changePasswordSchemaJoi.validateAsync(req.body, { abortEarly: false });
    if (value) return next()

})