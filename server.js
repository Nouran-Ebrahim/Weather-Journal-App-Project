// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port,function(){
    console.log(`your server is running on ${port}`);
});

// get function
app.get('/all',function(req,res){
    res.send(projectData);
    projectData = [];
});

// post function
app.post('/add',function(req,res){
     let data = req.body;
    console.log(`server side data is ${data}`);

    //date , temp , feel(input)
     entry= {
         date : data.date ,
         temp : data.temp,
         feel : data.feels
     };
     projectData.push(entry);
});