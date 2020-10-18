const { table } = require("console");
const nodemailer = require('nodemailer');
var express = require("express");
var path = require("path");
const { EDESTADDRREQ } = require("constants");
var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var inTableList = [
    {
        reservationName:"Alan Zavala",
        reservationEmail:"A01338448@itesm.mx",
        reservationID:"10",
        phoneNumber:"01800-123-122"
    }
]

var waitingList = [
    {
        reservationName:"Lionel Messi",
        reservationEmail:"messi10@gmail.com",
        reservationID:"101010",
        phoneNumber:"01-800-2313"
    }
]

var isSpace = 0;

// Estos métodos mandan prrimero al post (ajax) de la página
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res) {
    return res.json(inTableList);
});

app.get("/api/waitingList", function(req, res) {
    return res.json(waitingList);
});

app.post("/sendMail", function(req, res) {
    console.log("email enviado");
    console.log(req.body);
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "josiah.goodwin97@ethereal.email",
            pass: "2aCg9hVjP3k2dRNxcS"
        }
    });
   
    let mailOptions = {
        from: 'alom182gd@gmail.com',
        to: req.body.mail,
        subject: 'Reservación disponible',
        text: req.body.message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('error ocurrssss');
            console.log(error);
        } else {
            console.log('Email sent');
        }
    });
    
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.post("/api/tables", function(req, res) {
    
    var newR = req.body;
    if (inTableList.length < 5) {
        inTableList.push(newR);
        isSpace = 0;
    }
    else {
        waitingList.push(newR);
        isSpace = 1;
    }
    res.send({isSpace: isSpace, newR: newR});

  });

// app.get("/clearTables", function(req,res) {
//     waitingList = {};
//     inTableList = {};
//     isSpace = 0;
//     res.sendFile(path.join(__dirname, "tables.html"));
// });

// app.post("/clear", function(req, res) {
//     console.log("sajda");
//     tableList = [];
//     waitList = [];

//     res.sendFile(path.join(__dirname, "tables.html"));

// });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

