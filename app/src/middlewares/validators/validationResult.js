const { validationResult } = require('express-validator');

/**
 * Checks for Validation errors. If errors, responds with errors Or moves to the next middleware in the Route chain
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 * @param {CallableFunction} next - Next callback
 */
const validate = async (req, res, next) => {
    
        // Finds the validation errors in this request and returns an error response
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            let response = {};
            errors.array().map(e => {
                if (response[e.param]) {
                    response[e.param].push(e.msg);
                } else {
                    response[e.param] = [e.msg];
                }
            })
            return res.status(422).send({
                status: false,
                message: 'Validation Error(s)',
                data: response
            });
        }
        //Moves to the next middleware if the request passes validation
        return next();

};

module.exports = (validationRules) => [validationRules, validate];