const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const users = await User.findAll();
    return res.json(users)
});

const create = catchError(async (req, res) => {
    const {first_name, last_name, email, password, birthday} = req.body;
    const newBody = {first_name, last_name, email, password, birthday};
    const user = await User.create(newBody);
    return res.json(user)
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.sendStatus(404);
    return res.json(user)
});

const destroy = catchError(async (req, res) => {
    const { id } = req.params;
    const user = await User.destroy({ where: { id }})
    if (!user) return res.sendStatus(404);
    return res.send("User deleted").status(204)
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const {first_name, last_name, password} = req.body
    const user = await User.update({first_name, last_name, password}, {where: {id}, returning:true});
    return res.json(user[1][0])
})

module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}