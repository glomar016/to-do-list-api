const e = require('express');
const db = require('../models');
const Reservation_line = db.Reservation_line;
const Reservation = db.Reservation;

// Create
exports.create = async (req, res) => {
    
    // req.body.created_by = req.user.id

    Reservation_line.create(req.body)
    .then((data) => {
        Reservation_line.findByPk(data.id).then((result) => {
            res.send({
                error: false,
                data: result,
                message: "Reservation_line created successfully."
            });
        })
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

// Retrive all 
exports.findAll = (req, res) => {
    Reservation_line.findAll({
        include: [{
            model: db.Reservation,
            as: "reservation",
            include: [{
                model: db.Schedule,
                as: "schedule",
                include: [{
                    model: db.Route,
                    as: "route",
                    include: [
                        {
                            model: db.Terminal,
                            as: "origin"
                        },
                        {
                            model: db.Terminal,
                            as: "destination"
                        }
                    ]
                }],
            },
            {
                model: db.Promo,
                as: "promo",
            }],
        },
        {
            model: db.Bus_seat,
            as: "seat",
        }
        ],
        where: { status: "Active", reservationId: req.params.id} })
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

    Reservation_line.findByPk(id)
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

    Reservation_line.update(req.body, {
        where: {id: id},
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            Reservation_line.findByPk(id).then((data) =>{
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

    Reservation_line.update(body, {
        where: {id: id},
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            Reservation_line.findByPk(id).then((data) =>{
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

// Create
exports.bulkCreate = async (req, res) => {
    
    // req.body.created_by = req.user.id

    Reservation_line.bulkCreate(req.body)
    .then((data) => {
        Reservation_line.findAll(data.id).then((result) => {
            res.send({
                error: false,
                data: result,
                message: "Reservation_line created successfully."
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

exports.delete_reservation_lines = (req, res) => {
    const reservationId = req.params.id;
    const body = { status: "Inactive" };

    Reservation_line.update(body, {
        where: { reservationId: reservationId },
    })
    .then((result) =>{
        console.log(result);
        if(result) {
            // Success
            Reservation_line.findAll({where: {reservationId: reservationId}}).then((data) =>{
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
        console.log(err)
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        });
    });
}