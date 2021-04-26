const e = require('express');
const db = require('../models');
const User = db.User;
const bcrypt = require("bcrypt");
const datatables = require("sequelize-datatables");

exports.findDataTable = (req, res) => {

    // sample req
    req.body = {
        draw: "1",
        columns: [
            {
                data: "full_name",
                name: "",
                searchable: "true",
                orderable: "true",
                search: {
                    value: "",
                    regex: "false",
                },
            },
        ],
        order: [
            {
                column: "0",
                dir: "asc",
            },
        ],
        start: "0",
        length: "10",
        search: {
            value: "",
            regex: "false",
        },
        _: "1478912938246",
    };

    datatables(User, req.body).then((result) => {
        res.json(result);
    });
};

// Create
exports.create = async (req, res) => {
    req.body.full_name = "";

    req.body.created_by = req.user.id;

    req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUND));

    console.log(req.body.password);

    User.create(req.body)
    .then((data) => {
        User.findByPk(data.id, { include: ["createdBy"] }).then((result) => {
            res.send({
                error: false,
                data: result,
                message: "User is created successfully."
            });
        });
    })
    .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        })
    });
};

// Retrive all 
exports.findAll = (req, res) => {
    User.findAll({ where: { status: "Active"} })
    .then((data) => {
        res.send({
            error: false,
            data: data,
            message: "Retrived successfully."
        });
    })
    .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        })
    });
};

// Find a single
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
    .then((data) => {
        res.send({
            error: false,
            data: data,
            message: "Success!"
        });
    })
    .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        })
    })
};

// Update
exports.update = async (req, res) => {
    const id = req.params.id;

    req.body.full_name = "";

    if(req.body.password){
        req.body.password = await bcrypt.hash(
            req.body.password,
            parseInt(process.env.SALT_ROUND)
            );
    }

    User.update(req.body, {
        where: {id: id},
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            User.findByPk(id).then((data) =>{
                res.send({
                    error: false,
                    data: data,
                    message: [process.env.SUCCESS_UPDATE],
                });
            });
        }
        else{
            // if there is an error 
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message)
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        });
    });
};

// Delete
exports.delete = (req, res) => {
    const id = req.params.id;
    const body = { status: "Inactive" };

    User.update(body, {
        where: {id: id},
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            User.findByPk(id).then((data) =>{
                res.send({
                    error: false,
                    data: data,
                    message: [process.env.SUCCESS_UPDATE],
                });
            });
        }
        else{
            // if there is an error 
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message)
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        });
    });
};
