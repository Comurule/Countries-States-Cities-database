const DB = require('../database/models');
const { Op } = require("sequelize");

exports.create_a_country = async (data) => {

    const check_record = await DB.Country.findOne({
        where: {
            name: {
                [Op.iLike]: data.name
            }
        }
    });
    if (check_record) return {
        status: false,
        message: 'This Record already exists'
    };

    await DB.Country.create({
        name: data.name,
        sortname: data.sortname,
        phoneCode: data.phone_code,
    })

    return {
        status: true,
        message: 'Country Record Created Successfully'
    }
};

exports.update_a_country = async (id, data) => {

    let country_record = await DB.Country.findByPk(id);
    if (!country_record) return {
        status: false,
        message: 'Invalid ID details'
    }

    if (data.name) {
        const check_record = await DB.Country.findOne({ where: { name: { [Op.iLike]: data.name } } });
        if (check_record && check_record.id != id) return {
            status: false,
            message: 'Record already exists'
        }

        country_record.name = data.name;
    }
    if (data.sortname) country_record.sortname = data.sortname;
    if (data.phone_code) country_record.phoneCode = data.phone_code;

    await country_record.save();

    return {
        status: true,
        message: 'Country Record Updated'
    }
};

exports.get_a_country = async (id) => {

    let country_record = await DB.Country.findOne({ 
        where: { id },
        include: DB.State 
    });
    if (!country_record) return {
        status: false,
        message: 'Invalid ID details'
    }

    return {
        status: true,
        message: 'Country Record details',
        data: country_record
    }
};

exports.get_all_selected_countries = async (data) => {

    let where = {};
    if (data.name) where.name = data.name;
    if (data.sortname) where.sortname = data.sortname;

    let all_records = await DB.Country.findAll({ where });

    return {
        status: true,
        message: 'All Requested Records',
        data: all_records
    }
};

exports.delete_a_country = async (id) => {

    const country_record = await DB.Country.findOne({ where: { id } });
    if (!country_record) return {
        status: false,
        message: 'Invalid ID details'
    }

    await country_record.destroy();

    return {
        status: true,
        message: 'Country Record Deleted Successfully'
    }
};