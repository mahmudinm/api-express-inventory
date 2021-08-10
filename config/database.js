import { Sequelize } from "sequelize";

// const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER || 'root', process.env.MYSQL_PASSWORD || '', {
//     host: process.env.MYSQL_HOST,
//     dialect: 'mysql'
// });

const db = new Sequelize('express-inventory', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;