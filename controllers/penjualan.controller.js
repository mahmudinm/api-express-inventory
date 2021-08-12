import Penjualan from "../models/penjualan.model.js";
import Barang from "../models/barang.model.js";
import db from "../config/database.js";
import { Sequelize } from "sequelize";

export const index = async (req, res) => {
    try {
        const barang = await Barang.findAll();
        res.send(barang);                
    } catch (error) {
        console.log(error);
    }
}

// Create penjualan baru
export const create = async (req, res) => {
    try {
        const barangs = await Barang.findAll();

        res.json({
            "barangs": barangs
        });
    } catch (err) {
        console.log(err);
    }
}

// Create penjualan baru
export const store = async (req, res) => {
    try {
        const { body } = req;
        const t        = await db.transaction();
    
        try {
            await Penjualan.create({
                barang_id    : body.barang_id,
                jumlah_barang: body.jumlah_barang,
                jumlah_harga : body.jumlah_harga,
                tanggal      : body.tanggal,
            }, { transaction: t });

            await Barang.update({
                stock: Sequelize.literal('stock -' + body.jumlah_barang)
            }, {
                where: {
                    id: body.barang_id
                },
                transaction: t
            });

            await t.commit()
            
            res.json({
                "message": "berhasil simpan data" 
            })
        } catch (error) {

            await t.rollback()
            
            res.json({
                "message": "gagal simpan data"
            })
        }
    } catch (err) {
        console.log(err);
    }
}

export const edit = async (req, res) => {
    try {
        const penjualan = await Penjualan.findOne({
            where: {
                id: req.params.id
            }
        })

        res.send(penjualan);
    } catch (error) {
        console.log(error);
    }
}


export const update = async (req, res) => {
    try {
        const { body }    = req;
        let status        = '';
        let jumlah_status = '';
        const jumlah_awal = await Penjualan.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['jumlah_barang']
        });

        if (jumlah_awal.jumlah_barang < body.jumlah_barang) { // 5 < 6 atau sedang menambahkan jumlah
            status        = '-';
            jumlah_status = body.jumlah_barang - jumlah_awal.jumlah_barang ;
        } else if (jumlah_awal.jumlah_barang > body.jumlah_barang) { // 5 > 4 atau sedang mengurangi jumlah
            status        = '+';
            jumlah_status = jumlah_awal.jumlah_barang - body.jumlah_barang;
        } else if (jumlah_awal.jumlah_barang == body.jumlah_barang) {  // jika sama maka kasih 0 
            status        = '+';
            jumlah_status = 0;
        }

        const t = await db.transaction();
        try {
            await Penjualan.update({
                barang_id    : body.barang_id,
                jumlah_barang: body.jumlah_barang,
                jumlah_harga : body.jumlah_harga,
                tanggal      : body.tanggal,
            }, { 
                where: {
                    id: req.params.id
                },
                transaction: t 
            });            
            
            await Barang.update({
                stock: Sequelize.literal('stock ' + status + jumlah_status)
            }, {
                where: {
                    id: body.barang_id
                },
                transaction: t
            });

            await t.commit()

            res.json({
                "message": "berhasil update data"
            })
        } catch (error) {

            await t.rollback()

            res.json({
                "message": "gagal simpan data"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

// Delete penjualan berdasarkan id
export const destroy = async (req, res) => {
    try {
        
        const penjualan = await Penjualan.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['barang_id', 'jumlah_barang']
        });

        const t = await db.transaction();

        try {
            await Penjualan.destroy({
                where: {
                    id: req.params.id
                }
            });

            await Barang.update({
                stock: Sequelize.literal('stock +' + penjualan.jumlah_barang)
            }, {
                where: {
                    id: penjualan.barang_id
                }
            });
            
            await t.commit();

            res.json({
                "message": "berhasil delete data"
            });
            
        } catch (error) {

            await t.rollback();
            
            res.json({
                "message": "gagal simpan data"
            });
            
        }
    } catch (err) {
        console.log(err);
    }
}