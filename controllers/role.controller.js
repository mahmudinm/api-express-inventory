import Role from "../models/role.model.js";

export const index = async (req, res) => {
    try {
        const role = await Role.findAll();
        res.send(role);
    } catch (error) {
        console.log(error);
    }
}

// Create role baru
export const store = async (req, res) => {
    try {
        const { body } = req;
        
        const role = await Role.create({
            nama   : body.nama
        });

        res.json({
            "message": "Role Created",
            "role"   : role.toJSON()
        });
    } catch (err) {
        console.log(err);
    }
}

export const edit = async (req, res) => {
    try {
        const role = await Role.findAll({
            where: {
                id: req.params.id
            }
        })

        res.send(role[0]);
    } catch (error) {
        console.log(error);
    }
}

// Update role berdasarkan id
export const update = async (req, res) => {
    try {
        await Role.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        
        res.json({
            "message": "Role Updated"
        });
    } catch (err) {
        console.log(err);
    }
}

// Delete role berdasarkan id
export const destroy = async (req, res) => {
    try {
        await Role.destroy({
            where: {
                id: req.params.id
            }
        });
        
        res.json({
            "message": "Role Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}