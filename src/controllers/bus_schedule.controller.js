const e = require('express');
const db = require('../models');
const busSchedule = db.Bus_schedule;
const busInformation = db.Bus_information;
const Schedule = db.Schedule;
const Bus_type = db.Bus_type;
const Route = db.Route;
const Terminal = db.Terminal;

// Create
exports.create = (req, res) => {

    // req.body.created_by = req.user.id;
    
    busSchedule.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: ["Bus schedule is created successfully."]
        });
    }).catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        })
    });
};

// Retrieve all 
exports.findAll = async (req, res) => {
    busSchedule.findAll({ 
        include: [{
            model: Schedule,
            as : "busSchedule",
            include: {
                model: Route,
                as: "route",
                include: [{
                    model: Terminal,
                    as: "origin"
                },
                {
                    model: Terminal,
                    as: "destination"
                }]
            }
        },
        {
            model: busInformation,
            as : "busInformation",
            include: {
                model: Bus_type,
                as: "busTypeId"
            }
        },
        ], 
        where: { 
            status: "Active"
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
        console.log(err)
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        })
    });
};

// Retrieve all 
exports.findAllAvailable = async (req, res) => {
    routeId = req.params.routeId
    typeId = req.params.typeId
    date = req.params.date

    busSchedule.findAll({ 
        include: ["busInformation", "busSchedule"], 
        where: { 
            status: "Active",
            scheduleDate: date,
            '$busSchedule.routeId$': routeId,
            '$busSchedule.busTypeId$': typeId,
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
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        })
    });
};


// Find a single
exports.findOne = async (req, res) => {
    const id = req.params.id;
    

    busSchedule.findByPk(id, { include: ["busInformation"]})
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

    busSchedule.update(req.body, {
        where: {id: id},
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            busSchedule.findByPk(id).then((data) =>{
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
    busSchedule.update(body, {
        where: {id: id},
    })
    .then((result) =>{
        if(result) {
            // Success
            busSchedule.findByPk(id).then((data) =>{
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
