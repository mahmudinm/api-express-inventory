import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Shop = db.define('shops', {
    user_id: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true
});

export default Shop;