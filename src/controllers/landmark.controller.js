const e = require('express');
const db = require('../models');
const Landmark = db.Landmark;
const bcrypt = require("bcrypt");
const datatables = require("sequelize-datatables");


// Create
exports.create = async (req, res) => {
   
    Landmark.create(req.body)
    .then((data) => {
        Landmark.findByPk(data.id).then((result) => {
            res.send({
                error: false,
                data: result,
                message: "Landmark is created successfully."
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

//Retrive all 
exports.findAll = (req, res) => {
    const id = req.params.id;
    
    Landmark.findAll({ where: { status: "Active", routeId: id} })
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

    Landmark.findByPk(id)
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

   
    Landmark.update(req.body, {
        where: {id: id},
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            Landmark.findByPk(id).then((data) =>{
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

//Delete
exports.delete = (req, res) => {
    const id = req.params.id;
    const body = { status: "Inactive" };

    Landmark.update(body, {
        where: {id: id},
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            Landmark.findByPk(id).then((data) =>{
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

