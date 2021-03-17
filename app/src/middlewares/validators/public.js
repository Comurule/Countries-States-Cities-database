const { check, oneOf } = require('express-validator');

exports.check_id = [
    check('id').trim().notEmpty().withMessage('ID is required')
        .isInt().withMessage('ID must be an Integer')
        .escape()
]

exports.state_search_rules = oneOf([
    check('name').trim().notEmpty().withMessage('ID is required')
        .isString().withMessage('This must be in string format.'),
    check('country').trim().notEmpty().withMessage('ID is required')
        .isString().withMessage('This must be in string format.')
        .escape(),
    check('country_id').trim().notEmpty().withMessage('ID is required')
        .isInt().withMessage('This must be in integer format.')
        .escape(),
],
    "You must add a query request."
)

exports.city_search_rules = oneOf([
    check('name').trim().notEmpty().withMessage('ID is required')
        .isString().withMessage('This must be in string format.'),
    check('state').trim().notEmpty().withMessage('ID is required')
        .isString().withMessage('This must be in string format.')
        .escape(),
    check('state_id').trim().notEmpty().withMessage('ID is required')
        .isInt().withMessage('This must be in integer format.')
        .escape(),
],
    "You must add a query request."
)