const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// (req, res) => {"arrow fxn "}
app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiKey}`;
 
  https.get(url, function (responce) {
    // console.log(response.statusCode);
    // response.on("data", function(data){
    //    console.log(JSON.parse(data));
    responce.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const name = weatherData.name;
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;

      // Getting weather icon from same site
      const icon = weatherData.weather[0].icon;
      const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      // res.send("<h1>The temperature in"  + name +" is "+temp+ "degrees Celcius </h1>");
      // Can write multiple write methond to send collective write data

      res.write(`<p>The weather is currenty ${description}</p>`);
      res.write(`<h1>The temperature in ${name} is ${temp} degrees Celcius </h1>`);
      res.write(`<img src=${imgURL} alt=weather-icon>`);
      res.send();
    });
  });
});
//https get

//Arrow function
app.listen(3000, () => {
  console.log("Sereve is running on port 3000");
});
