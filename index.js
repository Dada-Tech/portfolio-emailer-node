const express = require('express');
const Joi = require('@hapi/joi'); // class returned
const app = express();

// use JSON parse in body. middleware
app.use(express.json());

// in bash: "export PORT=3000"
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

    if(result.error){
        // 400 for bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const msg = {
        to: 'daviddadaa@hotmail.com',
        from: 'david-dada-portfolio@dadadavid.com',
        subject: req.body.subject.toString(),
        text: req.body.text,
        html: '<strong>sent from Portfolio</strong>',
    };

    res.send("email SENT");
});


app.listen(port,() => console.log(`Listening on port ${port}...`));


