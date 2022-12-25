const path = require("path");
const express = require("express");
const hbs = require("hbs");

//required both functions

const geoCode = require("./utils/geocode")
const forecast = require("./utils/weather-lookup")


//Paths for views and public directory
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();

//express config
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

// All Routes

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Nirav Mendapara",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Nirav Mendapara", 
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Please find the list of items for which we can be helpful!!!",
    name: "Nirav Mendapara",
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: "Please provide the address for which you want to get weather forecast"
    })
  }
  geoCode(req.query.address,(error,{longitude,latitude,place_name} = {})=> {
        if (error) {
            return res.send({
              error : error
            })
        }
        forecast(longitude,latitude,(error,{temperature,feelslike,country}={})=>{
          if (error){
            return res.send({
              error : error
            })
          }
          res.send({
            temperature,
            feelslike,
            country,
            place_name
          })
        })
  })
  // console.log(req.query.address)
   
});

app.get("/help/*", (req, res) => {
  res.render("404-Page", {
    title: "No service Available",
    error_message: "No Help Available for this Article",
    name: "Nirav Mendapara",
  });
});

app.get("*", (req, res) => {
  res.render("404-Page", {
    title: "No Service Available",
    error_message: "Page Not Found 404",
    name: "Nirav Mendapara",
  });
});
// start server
app.listen(3000, () => {
  console.log("Server is running");
});
