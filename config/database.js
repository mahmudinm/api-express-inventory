import { Sequelize } from "sequelize";

const db = new Sequelize('express-crud', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;