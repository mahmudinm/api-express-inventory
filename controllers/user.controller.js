import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import bcrypt from "bcrypt";

export const index = async (req, res) => {
    try {
        const user = await User.findAll();
        res.send(user);
    } catch (error) {
        console.log(error);
    }
}

export const create = async (req, res) => {
    try {
        const roles = await Role.findAll();

        res.json({
            "roles": roles 
        });
              
    } catch (error) {
        console.log(error);
    }
}

// Create user baru
export const store = async (req, res) => {
    try {
        const { body } = req;

        const salt     = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(body.password, salt);
        
        const user = await User.create({
            role_id : body.role_id,
            username: body.username,
            email   : body.email,
            password: password,
        });

        res.json({
            "message": "User Created",
            "user"   : user.toJSON()
        });
    } catch (err) {
        console.log(err);
    }
}

export const edit = async (req, res) => {
    try {
        const roles = await Role.findAll();
        const user  = await User.findAll({
            where: {
                id: req.params.id
            }
        })

        res.json({
            "user" : user[0],
            "roles": roles
        });
    } catch (error) {
        console.log(error);
    }
}

// Update user berdasarkan id
export const update = async (req, res) => {
    try {
        const { body } = req;

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(body.password, salt);

        await User.update({
            role_id : body.role_id,
            password: password
        }, {
            where: {
                id: req.params.id
            }
        });
        
        res.json({
            "message": "User Updated"
        });
    } catch (err) {
        console.log(err);
    }
}

// Delete user berdasarkan id
export const destroy = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        
        res.json({
            "message": "User Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}