const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html")


})


app.post("/",function(req,res){

    let query = req.body.cityInput;
    let unit = "metric";
    let apiKey = "6dcac832791ede4af60b79e1b8bfdad6";

     
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`;

    https.get(url,function(response){
    
       response.on('data',function(data){
           let weatherData = JSON.parse(data);
           let temp = weatherData.main.temp;
           let weather = weatherData.weather[0].description;

           res.write(`<h1>The Temperature in ${query} is ${temp}`);
           res.write(`<h1>The Weather Condition in ${query} is ${weather}`);
           res.send();
       })
          
    })


})





app.listen(3000,function(){
     console.log("Server is Running at PORT 3000...");
})