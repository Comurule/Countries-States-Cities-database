const { check } = require('express-validator');

exports.order_add_rules = [
    check('order_number').notEmpty().withMessage('ORDER NUMBER is required')
        .isString().withMessage('Invalid ORDER NUMBER details'),
    check('user_type').notEmpty().withMessage('USER TYPE is required')
        .isIn(["customer"]).withMessage('Invalid USER TYPE details'),
    check('delivery_address').notEmpty().withMessage('DELIVERY ADDRESS is required')
        .isString().withMessage('Invalid DELIVERY ADDRESS details'),
    check('billing_address').notEmpty().withMessage('BILLING ADDRESS is required')
        .isString().withMessage('Invalid BILLING ADDRESS input'),
    check('pick_up_option').notEmpty().withMessage('PICK UP OPTION is required')
        .isIn(["store", "address"]).withMessage('Invalid PICK UP OPTION details'),
]

exports.check_id = [
    check('id').notEmpty().withMessage('ID is required')
        .isInt().withMessage('Invalid ID details')
]

