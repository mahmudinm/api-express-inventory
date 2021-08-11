import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Barang = db.define('barang', {
    kode: {
        type: DataTypes.STRING
    },
    nama: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.INTEGER
    },
    harga: {
        type: DataTypes.INTEGER
    },
    ukuran: {
        type: DataTypes.STRING
    },
    gambar: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true
});

export default Barang;