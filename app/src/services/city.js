const DB = require('../database/models');
const { Op } = require("sequelize");

exports.create_a_city = async (data) => {

    const check_record = await DB.City.findOne({
        where: {
            name: { [Op.iLike]: data.name },
            state_id: data.state_id
        }
    });
    if (check_record) return {
        status: false,
        message: 'This Record already exists'
    };

    await DB.City.create({
        name: data.name,
        state_id: data.state_id
    })

    return {
        status: true,
        message: 'City Record Created Successfully'
    }
};

exports.update_a_city = async (id, data) => {

    let city_record = await DB.City.findByPk(id);
    if (!city_record) return {
        status: false,
        message: 'Invalid ID details'
    }

    if (data.name) {
        const check_record = await DB.City.findOne({ 
            where: { 
                name: { [Op.iLike]: data.name },
                state_id: data.state_id
            } 
        });
        if (
            check_record && 
            check_record.id != id
            ) return {
            status: false,
            message: 'Record already exists'
        }

        city_record.name = data.name;
    }
    if (data.state_id) city_record.state_id = data.state_id;

    await city_record.save();

    return {
        status: true,
        message: 'City Record Updated'
    }
};

exports.get_a_city = async (id) => {

    let city_record = await DB.City.findOne({ where: { id } });
    if (!city_record) return {
        status: false,
        message: 'Invalid ID details'
    }

    return {
        status: true,
        message: 'City Record details',
        data: city_record
    }
};

exports.get_all_selected_cities = async (data) => {

    let where = {}, stateWhere = {};
    if (data.name) where.name = data.name;
    if (data.state_id) where.state_id = data.state_id;
    if (data.state) stateWhere.name = { [Op.iLike]: data.state };

    let all_records = await DB.City.findAll({ 
        where,
        include : {
            model: DB.State,
            attributes: ["name"],
            where: stateWhere
        }
     });

    return {
        status: true,
        message: 'All Requested Records',
        data: all_records
    }
};

exports.delete_a_city = async (id) => {

    const city_record = await DB.City.findOne({ where: { id } });
    if (!city_record) return {
        status: false,
        message: 'Invalid ID details'
    }

    await city_record.destroy();

    return {
        status: true,
        message: 'City Record Deleted Successfully'
    }
};