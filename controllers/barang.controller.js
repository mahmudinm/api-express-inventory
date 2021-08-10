import Barang from "../models/barang.model.js";

export const index = async (req, res) => {
    try {
        const barang = await Barang.findAll();
        res.send(barang);
    } catch (error) {
        console.log(error);
    }
}

export const find = async (req, res) => {
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

// Create barang baru
export const store = async (req, res) => {
    try {
        const { body } = req;
        const decoded  = decodeJwt(req.headers.authorization);
        
        const barang = await Barang.create({
            user_id: 1,
            name   : body.name
        });

        res.json({
            "message": "Barang Created",
            "barang"   : barang.toJSON()
        });
    } catch (err) {
        console.log(err);
    }
}

// Update barang berdasarkan id
export const update = async (req, res) => {
    try {
        await Barang.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Barang Updated"
        });
    } catch (err) {
        console.log(err);
    }
}

// Delete barang berdasarkan id
export const destroy = async (req, res) => {
    try {
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