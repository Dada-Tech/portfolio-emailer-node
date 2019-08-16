const express = require('express');
const Joi = require('@hapi/joi'); // class returned
require('dotenv').config();

// SendGrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// use JSON parse in body. middleware
const app = express();
app.use(express.json());

// in terminal: "source .env"
const port = process.env.PORT || 3000;

// GET
app.get('/',(req,res) => {
    res.send("Hello World");
});

app.get('/api/courses/:id',(req,res) => {
    res.send([req.params,req.query]);
});

// POST
app.post('/api/mail',(req,res) => {

    const schema = Joi.object().keys({
        subject: Joi.string().min(3).required(),
        text: Joi.string().required()
    });

    const result = Joi.validate(req.body,schema);

    if(result.error)
        // 400 for bad request
        return  res.status(400).send(result.error.details[0].message);

    const msg = {
        to: 'daviddadaa@hotmail.com',
        from: 'david-dada-portfolio@dadadavid.com',
        subject: req.body.subject.toString(),
        text: req.body.text,
        html: '<strong>sent from Node Server</strong>',
    };

    sgMail
        .send(msg)
        .then(() => {
            //Celebrate
            // console.log('Email Sent!');
        })
        .catch(error => {
            //Log friendly error
            console.error(error.toString());

            //Extract error msg
            const {message, code, response} = error;

            //Extract response msg
            const {headers, body} = response;
        });

    res.send("email SENT");
});

app.listen(port,() => console.log(`Listening on port ${port}...`));


