const DB = require('../database/models');
const { Op } = require("sequelize");

exports.create_a_state = async (data) => {

    const check_record = await DB.State.findOne({
        where: {
            name: { [Op.iLike]: data.name },
            country_id: data.country_id
        }
    });
    if (check_record) return {
        status: false,
        message: 'This Record already exists'
    };

    await DB.State.create({
        name: data.name,
        country_id: data.country_id
    })

    return {
        status: true,
        message: 'State Record Created Successfully'
    }
};

exports.update_a_state = async (id, data) => {

    let state_record = await DB.State.findByPk(id);
    if (!state_record) return {
        status: false,
        message: 'Invalid ID details'
    }

    if (data.name) {
        const check_record = await DB.State.findOne({
            where: {
                name: { [Op.iLike]: data.name },
                country_id: data.country_id
            }
        });
        if (check_record && check_record.id != id) return {
            status: false,
            message: 'Record already exists'
        }

        state_record.name = data.name;
    }
    if (data.country_id) state_record.country_id = data.country_id;

    await state_record.save();

    return {
        status: true,
        message: 'State Record Updated'
    }
};

exports.get_a_state = async (id) => {

    let state_record = await DB.State.findOne({
        where: { id },
        include: DB.City
    });
    if (!state_record) return {
        status: false,
        message: 'Invalid ID details'
    }

    return {
        status: true,
        message: 'State Record details',
        data: state_record
    }
};

exports.get_all_selected_states = async (data) => {

    let where = {}, countryWhere = {};
    if (data.name) where.name = data.name;
    if (data.country_id) where.country_id = Number(data.country_id);
    if (data.country) countryWhere.name = { [Op.iLike]: data.country };

    let all_records = await DB.State.findAll({ 
        where,
        include: {
            model: DB.Country,
            attributes: ["name"],
            where: countryWhere
        }
      });

    return {
        status: true,
        message: 'All Requested Records',
        data: all_records
    }
};

exports.delete_a_state = async (id) => {

    const state_record = await DB.State.findOne({ where: { id } });
    if (!state_record) return {
        status: false,
        message: 'Invalid ID details'
    }

    await state_record.destroy();

    return {
        status: true,
        message: 'State Record Deleted Successfully'
    }
};