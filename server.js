const express = require('express');
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
    const clientname = req.body.clientFname;
    const clientLname = req.body.clientlname;
    const clientEmail = req.body.clientemail;
    const clientPname = req.body.clientpnumber;
    const purposeSite = req.body.purposesite;
    const clientWebsite = req.body.clientwebsite;
    const clientTime = req.body.clienttime;
    const clientBudget = req.body.clientbudget;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pratikpatil1311@gmail.com',
            pass: 'spxg ofcr pcvt bqew' // Correct property name
        }
    });

    const mailOptions = {
        from: clientEmail,
        to: 'pratikpatil1311@gmail.com', // use site owner email to send to client
        subject: 'Client Website Enquiry',
        text: `
            Client Name: ${clientname} ${clientLname}
            Client Email: ${clientEmail}
            Client Phone: ${clientPname}
            Purpose of Site: ${purposeSite}
            Client Website: ${clientWebsite}
            Approx time to deliver website : ${clientTime}
            Budget: ${clientBudget}
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            // console.log('Error hitting Nodemailer server:', error);
            res.status(500).send('Error Submitting your data');
        } else {
            // console.log('Email sent successfully:', info.response);
            res.status(200).send(`<h1><center>Your response has been recorded we will inform you shortly..Thankyou for Contacting us</center></h1>`);
        }
    });
});

app.listen(5000, function () {
    console.log("App Running Successfully on port 5000");
});