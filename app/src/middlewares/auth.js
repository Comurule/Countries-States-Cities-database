const DB = require('../database/models');

module.exports = async (req, res, next) => {
    try {
        throw error()
        // next();

    } catch (error) {
        return res.status(401).send({
            status: false,
            message: 'Not authorized to access this route'
        })
    }
};