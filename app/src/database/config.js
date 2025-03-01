require('dotenv').config();

module.exports = {
    "production": {
        "database": process.env.DB_DATABASE,
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "dialect": "postgres",
        "port": Number(process.env.DB_PORT),
        "host": process.env.DB_HOST
    },
    "development": {
        "database": process.env.DB_DATABASE,
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "dialect": "postgres",
        "port": Number(process.env.DB_PORT),
        "host": process.env.DB_HOST
    },
};