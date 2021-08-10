import Supplier from "../models/supplier.model.js";

export const index = async (req, res) => {
    try {
        const supplier = await Supplier.findAll();
        res.send(supplier);
    } catch (error) {
        console.log(error);
    }
}

// Create supplier baru
export const store = async (req, res) => {
    try {
        const { body } = req;
        
        const supplier = await Supplier.create({
            nama  : body.nama,
            no_hp : body.no_hp,
            alamat: body.alamat
        });

        res.json({
            "message": "Supplier Created",
            "supplier"   : supplier.toJSON()
        });
    } catch (err) {
        console.log(err);
    }
}

export const edit = async (req, res) => {
    try {
        const supplier = await Supplier.findAll({
            where: {
                id: req.params.id
            }
        })

        res.send(supplier[0]);
    } catch (error) {
        console.log(error);
    }
}

// Update supplier berdasarkan id
export const update = async (req, res) => {
    try {
        await Supplier.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        
        res.json({
            "message": "Supplier Updated"
        });
    } catch (err) {
        console.log(err);
    }
}

// Delete supplier berdasarkan id
export const destroy = async (req, res) => {
    try {
        await Supplier.destroy({
            where: {
                id: req.params.id
            }
        });
        
        res.json({
            "message": "Supplier Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}