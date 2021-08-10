import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Penjualan = db.define('penjualan', {
    barang_id: {
        type: DataTypes.INTEGER
    },
    jumlah_barang: {
        type: DataTypes.INTEGER
    },
    jumlah_harga: {
        type: DataTypes.INTEGER
    },
    tanggal: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true
});

export default Penjualan;