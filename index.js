const axios = require('axios')
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const express = require("express");
const app = express();
const port = 4000;
const fetch = require('node-fetch')
app.use(cookie()); app.use(express.urlencoded({
    extended: false
}));
// ignore this. i am bad
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Abs:Admin@cluster0.5swzs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const start = async() =>{
    try{
        await client.connect()
        console.log('connected')
    }
    catch (e) {
        console.log(e)
    }
}
start()

app.set('view engine', 'ejs');
app.get('/', (req, res) =>
{ res.render("login.ejs");
});
app.get('/login', (req, res) =>
{ res.render("login.ejs");
});
app.post('/login', (req, res) =>
{
    const username = req.body.username;
    res.cookie('username', username);
     var oldTime = new Date().getTime();
     //
    const name = req.body.name;
    const email = req.body.email;
    const country = req.body.country;


    res.cookie('name', name);
    res.cookie('email', email);
    res.cookie('country', country);
    res.cookie('oldTime', oldTime); res.redirect('/main');
})
app.get('/main', (req, res) =>
{
    var newTime = new Date().getTime();
    var diff = newTime - req.cookies.oldTime;
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60); msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60); msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000); msec -= ss * 1000;
    var time = hh + " hours " + mm + " minutes " + ss + " seconds "; res.cookie('time', time);
    res.render("main.ejs", {
        username: req.cookies.username, //sending data
         time: req.cookies.time,
        name: req.cookies.name,
        country: req.cookies.country,
        email: req.cookies.email
    });
})
app.listen(4000)
