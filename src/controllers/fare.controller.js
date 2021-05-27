const e = require('express');
const db = require('../models');
const Fare = db.Fare;

// Create
exports.create = async (req, res) => {

    Fare.create(req.body)
    .then((data) => {
        Fare.findByPk(data.id)
        .then((result) => {
            res.send({
                error: false,
                data: result,
                message: "Fare created successfully."
            })
        })
    })
    .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        })
    });

}

// Read all
exports.findAll = (req, res) => {

    Fare.findAll({ 
        include: ["typeId"], 
        where: { 
            status: "Active"
        } 
        })
    .then((data) => {
        res.send({
            error: false,
            data: data,
            message: "Data successfully retrieved."
        })
    })
    .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        })
    })
}

// Get one
exports.findOne = (req, res) => {
    const id = req.params.id;

    Fare.findByPk(id)
    .then((data) => {
        res.send({
            error: false,
            data: data,
            message: "Data successfully retrieved"
        })
    })
    .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        })
    })

}

// Update
exports.update = async (req, res) => {

    const id = req.params.id;

    Fare.update(req.body, { where: {id: id} })
    .then((result) => {
        if(result){
            Fare.findByPk(id)
            .then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: "Fare successfully updated."
                })
            })
        }
        else{
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message)
            })
        }
    })
    .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        })
    })
}

// Delete
exports.delete = (req, res) => {
    const id = req.params.id;
    const body = { status: "Inactive"};

    Fare.update(body, {where: {id: id} })
    .then((result) => {
        if(result){
            Fare.findByPk(id)
            .then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: "Fare successfully deleted."
                })
            })
        }
        else{
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message)
            })
        }
    })
    .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        })
    })

}