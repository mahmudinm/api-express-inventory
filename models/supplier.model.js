import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Supplier = db.define('supplier', {
    nama: {
        type: DataTypes.STRING
    },
    no_hp: {
        type: DataTypes.STRING
    },
    alamat: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true
});

export default Supplier;