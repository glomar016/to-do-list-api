const e = require('express');
const db = require('../models');
const Bus_driver = db.Bus_driver;

// Create
exports.create = async (req, res) => {
    
    // req.body.created_by = req.user.id

    Bus_driver.create(req.body)
    .then((data) => {
        Bus_driver.findByPk(data.id).then((result) => {
            res.send({
                error: false,
                data: result,
                message: "Bus_driver created successfully."
            });
        })
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
    Bus_driver.findAll({ 
        include: ["busDriver"],
        where: { status: "Active"} })
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

exports.findOne = (req, res) => {
    const id = req.params.id;

    Bus_driver.findByPk(id, {include: ["busDriver"]})
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

exports.update = async (req, res) => {
    const id = req.params.id;

    Bus_driver.update(req.body, {
        where: {id: id},
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            Bus_driver.findByPk(id).then((data) =>{
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

    Bus_driver.update(body, {
        where: {id: id},
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            Bus_driver.findByPk(id).then((data) =>{
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