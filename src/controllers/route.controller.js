const e = require('express');
const db = require('../models');
const Route = db.Route;

    // Create 
    exports.create = async (req, res) => {

        // req.body.created_by = req.user.id;

        Route.create(req.body)
        .then((data) => {
            Route.findByPk(data.id)
            .then((result) => {
                res.send({
                    error: false,
                    data: result,
                    message: "Route created successfully"
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

    // Read all
    exports.findAll = (req, res) => {

        Route.findAll({ 
            include: ["origin", "destination"],
            where: {status: "Active"} })
        .then((data) => {
            res.send({
                error: false,
                data: data,
                message: "Retrieved data successfully"
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message)
            });
        })

    };

    //Find specific origin
    exports.findAllOrigin = (req, res) => {
        const originId = req.params.originId

        Route.findAll({ 
            include: ["origin", "destination"],
            where: {status: "Active", originId: originId } })
        .then((data) => {
            res.send({
                error: false,
                data: data,
                message: "Retrieved data successfully"
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message)
            });
        })

    };

    // Read one
    exports.findOne = (req, res) => {
        const id = req.params.id;

        Route.findByPk(id,
            {
                include: ["origin", "destination"]
            })
        .then((data) => {
            res.send({
                error: false,
                data: data,
                message: "Retrieved specific data successfully"
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message)
            });
        })

    };

    exports.update = async (req, res) => {
        const id = req.params.id;

        Route.update(req.body, { where: {id: id} })
        .then((result) => {
            console.log(result)
            if(result) {
                Route.findByPk(id)
                .then((data) => {
                    res.send({
                        error: false,
                        data: data,
                        message: "Record/s is successfully updated."
                    })
                });
            }
            else{
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
        })
    };

    exports.delete = async (res, send) => {
        
        const id = req.params.id;
        const body = { status: "Inactive" };

        Route.update(body, {where: {id: id}})
        .then((result) => {
            console.log(result);
            if(result){
                Route.findByPk(id)
                .then((data) => {
                    res.send({
                        error: false,
                        data: data,
                        message: "Successfully deleted a route"
                    });
                })
            }
            else{
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
        })

    }