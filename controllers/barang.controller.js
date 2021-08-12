import Barang from "../models/barang.model.js";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const index = async (req, res) => {
    try {
        const barang = await Barang.findAll();
        res.send(barang);
    } catch (error) {
        console.log(error);
    }
}

// Create barang baru
export const store = async (req, res) => {
    try {
        const { body } = req;

        let gambar     = req.files.gambar;
        let ext        = path.extname(gambar.name);
        let filename   = uuidv4()+''+ext; 
        let uploadPath = path.join(__dirname, '../uploads', filename);

        gambar.mv(uploadPath, function (err) {
            if (err)
                return res.status(500).send(err);
        });

        const barang = await Barang.create({
            kode  : body.kode,
            nama  : body.nama,
            stock : body.stock,
            harga : body.harga,
            ukuran: body.ukuran,
            gambar: filename,
        });

        res.json({
            "barang": barang.toJSON(),
            "message": "Barang Created"
        });
    } catch (err) {
        console.log(err);
    }
}

export const edit = async (req, res) => {
    try {
        const barang = await Barang.findAll({
            where: {
                id: req.params.id
            }
        })
        res.send(barang[0]);
    } catch (error) {
        console.log(error);
    }
}

// Update barang berdasarkan id
export const update = async (req, res) => {
    try {
        const { body } = req;

        const find_gambar = await Barang.findOne({
            where: {
                id: req.params.id
            }
        });

        const data = new Object;
        data.kode   = body.kode;
        data.nama   = body.nama;
        data.stock  = body.stock;
        data.harga  = body.harga;
        data.ukuran = body.ukuran;

        if (req.files) {
            fs.unlinkSync(path.join(__dirname, '../uploads', find_gambar.gambar)); // HAPUS GAMBAR
            
            let gambar     = req.files.gambar;
            let ext        = path.extname(gambar.name);
            let filename   = uuidv4() + '' + ext;
            let uploadPath = path.join(__dirname, '../uploads', filename);

            gambar.mv(uploadPath, function (err) {
                if (err)
                    return res.status(500).send(err);
            });

            data.gambar = filename;
        }

        await Barang.update(data, {
            where: {
                id: req.params.id
            }
        });

        res.json({
            "message": "Barang Updated"
            // "barang": barang.toJSON()
        });
    } catch (err) {
        console.log(err);
    }
}

// Delete barang berdasarkan id
export const destroy = async (req, res) => {
    try {
        const find_gambar = await Barang.findOne({
            where: {
                id: req.params.id
            }
        });

        if (find_gambar.gambar) { // JIKA ADA GAMBAR MAKA DELETE
            fs.unlinkSync(path.join(__dirname, '../uploads', find_gambar.gambar));
        }
        
        await Barang.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json({
            "message": "Barang Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}
