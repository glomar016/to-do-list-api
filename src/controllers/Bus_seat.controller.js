const e = require('express');
const db = require('../models');
const Bus_seat = db.Bus_seat;

// Create
exports.create = async (req, res) => {
    
    // req.body.created_by = req.user.id

    Bus_seat.create(req.body)
    .then((data) => {
        Bus_seat.findByPk(data.id).then((result) => {
            res.send({
                error: false,
                data: result,
                message: "Bus_seat created successfully."
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
    Bus_seat.findAll({ 
         include: [{
                model: db.Bus_template,
                as: "template"}
        ],
        where: { status: "Active", busInformationId: req.params.id},
        order: [
            ['sortNumber', 'ASC'],
        ]
    })
    .then((data) => {
        res.send({
            error: false,
            data: data,
            message: "Retrived successfully."
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

exports.findOne = (req, res) => {
    const id = req.params.id;

    Bus_seat.findByPk(id)
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

    Bus_seat.update(req.body, {
        where: {id: id},
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            Bus_seat.findByPk(id).then((data) =>{
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

    Bus_seat.update(body, {
        where: {id: id},
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            Bus_seat.findByPk(id).then((data) =>{
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

exports.createBusSeats = (req, res) => {
    
    Bus_seat.bulkCreate(req.body)
    .then((data) => {
        Bus_seat.findAll(data.id).then((result) => {
            res.send({
                error: false,
                data: result,
                message: "Bus_seat created successfully."
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
}

exports.createBusInformationSeats = (req, res) => {
    
    Bus_seat.bulkCreate(req.body)
    .then((data) => {
        Bus_seat.findAll(data.id).then((result) => {
            res.send({
                error: false,
                data: result,
                message: "Bus_seat created successfully."
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
}

exports.findAllTemplate = (req, res) => {


    Bus_seat.findAll({ 
         include: [{
                model: db.Bus_template,
                as: "template"}
        ],
        where: { status: "Active", templateId: req.params.id},
        order: [
            ['sortNumber', 'ASC'],
        ]
    })
    .then((data) => {
        res.send({
            error: false,
            data: data,
            message: "Retrived successfully."
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
