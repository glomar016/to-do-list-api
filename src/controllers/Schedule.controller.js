const e = require('express');
const db = require('../models');
const Schedule = db.Schedule;
const Bus_type = db.Bus_type;
const Route = db.Route;
const Terminal = db.Terminal;

// Create
exports.create = async (req, res) => {

    // req.body.created_by = req.user.id;

    Schedule.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: ["Schedule is created successfully."]
        });
    }).catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        })
    });
};

// Retrive all 
exports.findAll = (req, res) => {
    Schedule.findAll({ 
        include: ["busType", "route"], 
        where: { 
            status: "Active"
        } 
        })
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

 // Retrieve all available bus
 exports.findAllAvailBus = async (req, res) => {
    let selectedDay = req.params.selectedDay;
    selectedDay.toLowerCase();
    console.log(selectedDay);
 
    Schedule.findAll({ 
        include: [{
            model: db.Route,
            as: "route",
            include: {
                model: Terminal,
                as: "origin",
            }
        },
        {
            model: Bus_type,
            as: "busType",
        }
        ],

        // include: ["busType", "route"], 
        where: { 
            status: "Active",
            [selectedDay]: "True"
        } 
        })
    .then((data) => {
        res.send({
            error: false,
            data: data,
            message: "Retrieved successfully."
        });
    })
    .catch((err) => {
        console.log(err);
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

    Schedule.findByPk(id, { include: ["busType", "route"]})
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

    Schedule.update(req.body, {
        where: {id: id},
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            Schedule.findByPk(id).then((data) =>{
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
};

// Delete
exports.delete = (req, res) => {
    const id = req.params.id;
    const body = { status: "Inactive" };

    Schedule.update(body, {
        where: {id: id},
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            Schedule.findByPk(id).then((data) =>{
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


exports.get_specific_schedule = async (req, res) => {
    const id = req.params.id;
 
    Schedule.findAll({ 
        include: [{
            model: db.Route,
            as: "route",
            include: {
                model: db.Terminal,
                as: "origin",
            }
        },
        {
            model: db.Bus_type,
            as: "busType",
        },
        ],

        // include: ["busType", "route"], 
        where: { 
            status: "Active",
            id: id
        } 
        })
    .then((data) => {
        res.send({
            error: false,
            data: data,
            message: "Retrieved successfully."
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        })
    });
};