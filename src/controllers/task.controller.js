const e = require('express');
const db = require('../models');
const Task = db.Task;

// Create
exports.create = async (req, res) => {
    Task.create(req.body)
    .then((data) => {
        res.send({
            error: false,
            data: data,
            message: "Task is created successfully."
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
    Task.findAll()
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
    res.send("finding: " + req.params.id + req.params.id2)
};

// Update
exports.update = (req, res) => {

};

// Delete
exports.delete = (req, res) => {

};
