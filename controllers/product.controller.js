import Product from "../models/penjualan.model.js";
import Shop from "../models/barang.model.js";
import decodeJwt from "../utils/decodeJwt.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const index = async (req, res) => {
    try {
        const product = await Product.findAll();
        res.send(product);
    } catch (error) {
        console.log(error);
    }
}

export const find = async (req, res) => {
    try {
        const product = await Product.findAll({
            where: {
                id: req.params.id
            }
        })
        res.send(product[0]);
    } catch (error) {
        console.log(error);
    }
}

// Create product baru
export const store = async (req, res) => {
    try {
        const { body } = req;
        
        let image = req.files.image;

        let targetFile = req.files.image;
        let uploadPath = path.join(__dirname, '../uploads', targetFile.name);
        
        image.mv(uploadPath, function (err) {
            if (err)
                return res.status(500).send(err);
        });

        res.send('uploaded');

        // const decode = decodeJwt(req.headers.authorization);
        // const shop   = await Shop.findOne({
        //     user_id: decode.id
        // });
        
        // const product = await Product.create({
        //     shop_id: shop.id,
        //     name   : body.name,
        //     price  : body.price,
        //     image  : '102909asd.jpg'
        // });

        // res.json({
        //     "shop": product.toJSON(),
        //     "message": "Product Created"
        // });
    } catch (err) {
        console.log(err);
    }
}

// Update product berdasarkan id
export const update = async (req, res) => {
    try {
        const { body } = req;
        
        const product = await Product.update({
            name : body.name,
            price: body.price,
        }, {
            where: {
                id: req.params.id
            }
        });
        
        res.json({
            "message": "Product Updated",
            "product": product.toJSON()
        });
    } catch (err) {
        console.log(err);
    }
}

// Delete product berdasarkan id
export const destroy = async (req, res) => {
    try {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}
