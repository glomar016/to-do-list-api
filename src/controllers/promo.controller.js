const e = require('express');
const db = require('../models');
const Promo = db.Promo;


// Create
exports.create = async (req, res) => {
   
    Promo.create(req.body)
    .then((data) => {
        Promo.findByPk(data.id).then((result) => {
            res.send({
                error: false,
                data: result,
                message: "Promo is created successfully."
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
    Promo.findAll({ include: ["busType"], 
    where: { status: "Active"} })
    .then((data) => {
        res.send({
            error: false,
            data: data,
            message: "Promo retrived successfully."
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

    Promo.findByPk(id ,{include: ["busType"]})
    .then((data) => {
        res.send({
            error: false,
            data: data,
            message: "Retrieved specific promo successfully"
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

   
    Promo.update(req.body, {
        where: {id: id},
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            Promo.findByPk(id).then((data) =>{
                res.send({
                    error: false,
                    data: data,
                    message: "Promo is successfully updated.",
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

    Promo.update(body, {
        where: {id: id},
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            Promo.findByPk(id).then((data) =>{
                res.send({
                    error: false,
                    data: data,
                    message: "Succefully deleted a promo.",
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

