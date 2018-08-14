const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

//middleware lets us configure how our express app works
//its like a third party add on
//app.use is how we register middleware and it takes a function

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    //calling an asynchronous function without a callback is deprecated
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainance.hbs',{
//         pageTitle: 'Under Maintainance',
//         message: 'Site is currently being updated'
//     });
// });

//express.static() takes the absolute path to the folder
//we want to serve up, it is a middleware
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});


hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
//http route handler for get request, it takes 2 arg : url and function
app.get('/', (req, res) => {
    res.send({
        name:'Ayushee',
        likes:[
            'Dancing',
            'Studying',
            'Cooking'
        ]
    });
});

app.get('/about', (req, res) => {    
    res.render('about.hbs', {
        pageTitle: 'About Us Page'        
    });
});


app.get('/home', (req, res) => {    
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!!'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage:'Unable to handle request!'
    });
})
//it will bind an application to a port on a machine
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});