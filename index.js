const express = require('express');
const dotenv = require('dotenv');
const db = require('./src/models')
const jwt = require('jsonwebtoken');

// Import routes
const userRoute = require('./src/routes/user.routes');
const loginRoute = require('./src/routes/login.routes');
const busInfoRoute = require('./src/routes/bus_information.routes');
const busTypeRoute = require('./src/routes/bus_type.routes');
const terminalRoute = require('./src/routes/terminal.routes');
const landmarkRoute = require('./src/routes/landmark.routes');
const routeRoute = require('./src/routes/route.routes');
const fareRoute = require('./src/routes/fare.routes');
const busSchedRoute = require('./src/routes/bus_schedule.routes');
const scheduleRoute = require('./src/routes/schedule.routes');
const busDriverRoute = require('./src/routes/bus_driver.routes');
const insuranceRoute = require('./src/routes/insurance.routes');
const promoRoute = require('./src/routes/promo.routes');
const systemConfigRoute = require('./src/routes/system_config.routes');
const counterRoute = require('./src/routes/counter.routes');
const reservationRoute = require('./src/routes/reservation.routes');
const reservation_LineRoute = require('./src/routes/reservation_Line.routes');
const paymentRoute = require('./src/routes/payment.routes');
const busTemplateRoute = require('./src/routes/Bus_template.routes');
const chart_Of_AccountRoute = require('./src/routes/Chart_of_account.routes');
const busRegistrationRoute = require('./src/routes/bus_registration.routes');

var app = express();

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

// console.log(require("crypto").randomBytes(64).toString("hex"));
//commentt
//comment ulit
dotenv.config();

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch((err) => {
        console.error('Unable to connect to the database', err);
});

if(process.env.ALLOW_SYNC === "true"){
    db.sequelize
    .sync({ alter: true })
    .then(() => 
        console.log('Done adding/updating database based on Models')
    );
}


app.use((req, res, next) => {
    console.log(req.url);
    console.log('Request has been sent!' + req.url);
    next();
})

app.get('/', (req, res) => {
    res.json({message: "Hello World!"});
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    // verify if token is valid
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(user, err);
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Routes
app.use(`${process.env.API_VERSION}/login`, loginRoute);
app.use(`${process.env.API_VERSION}/user`, userRoute);
app.use(`${process.env.API_VERSION}/bus_information`, busInfoRoute);
app.use(`${process.env.API_VERSION}/bus_type`, busTypeRoute);
app.use(`${process.env.API_VERSION}/terminal`, terminalRoute);
app.use(`${process.env.API_VERSION}/landmark`, landmarkRoute);
app.use(`${process.env.API_VERSION}/route`, routeRoute);
app.use(`${process.env.API_VERSION}/fare`, fareRoute);
app.use(`${process.env.API_VERSION}/bus_schedule`, busSchedRoute);
app.use(`${process.env.API_VERSION}/schedule`, scheduleRoute);
app.use(`${process.env.API_VERSION}/bus_driver`, busDriverRoute);
app.use(`${process.env.API_VERSION}/insurance`, insuranceRoute);
app.use(`${process.env.API_VERSION}/promo`, promoRoute);
app.use(`${process.env.API_VERSION}/system_config`, systemConfigRoute);
app.use(`${process.env.API_VERSION}/counter`, counterRoute);
app.use(`${process.env.API_VERSION}/reservation`, reservationRoute);
app.use(`${process.env.API_VERSION}/reservation_line`, reservation_LineRoute);
app.use(`${process.env.API_VERSION}/payment`, paymentRoute);
app.use(`${process.env.API_VERSION}/Bus_template`, busTemplateRoute);
app.use(`${process.env.API_VERSION}/Chart_of_account`, chart_Of_AccountRoute);
app.use(`${process.env.API_VERSION}/bus_registration`, busRegistrationRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});