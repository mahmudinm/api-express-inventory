import Shop from "../models/shop.model.js";
import decodeJwt from "../utils/decodeJwt.js";

export const index = async (req, res) => {
    try {
        const shop = await Shop.findAll();
        res.send(shop);
    } catch (error) {
        console.log(error);
    }
}

export const find = async (req, res) => {
    try {
        const shop = await Shop.findAll({
            where: {
                id: req.params.id
            }
        })
        res.send(shop[0]);
    } catch (error) {
        console.log(error);
    }
}

// Create shop baru
export const store = async (req, res) => {
    try {
        const { body } = req;
        const decoded  = decodeJwt(req.headers.authorization);
        
        const shop = await Shop.create({
            user_id: 1,
            name   : body.name
        });

        res.json({
            "message": "Shop Created",
            "shop"   : shop.toJSON()
        });
    } catch (err) {
        console.log(err);
    }
}

// Update shop berdasarkan id
export const update = async (req, res) => {
    try {
        await Shop.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Shop Updated"
        });
    } catch (err) {
        console.log(err);
    }
}

// Delete shop berdasarkan id
export const destroy = async (req, res) => {
    try {
        await Shop.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Shop Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}