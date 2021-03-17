const cityServices = require('../services/city');
const stateServices = require('../services/state');
const countryServices = require('../services/country');

exports.get_selected_countries = async (req, res) => {
    try {
        const result = await countryServices.get_all_selected_countries(req.query || {});

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })
    }
};

exports.get_a_country = async (req, res) => {
    try {
        const result = await countryServices.get_a_country(req.params.id);

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })
    }
};

exports.get_selected_states = async (req, res) => {
    try {
        const result = await stateServices.get_all_selected_states(req.query || {});

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })
    }
};

exports.get_a_state = async (req, res) => {
    try {
        const result = await stateServices.get_a_state(req.params.id);

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })
    }
};

exports.get_selected_cities = async (req, res) => {
    try {
        const result = await cityServices.get_all_selected_cities(req.query || {});

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })
    }
};

exports.get_a_city = async (req, res) => {
    try {
        const result = await cityServices.get_a_city(req.params.id);

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })
    }
};