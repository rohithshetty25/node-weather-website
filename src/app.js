const path = require("path");
const express = require("express");
const hbs = require('hbs')
const forecast = require('./utils/forecast')


const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('home', {
    title: 'Weather App',
    name: 'MS Dhoni'
  })
})

app.get('/about', (req, res)=>{
  res.render('about',{
    title: 'About me',
    name: "MS Dhoni"
  })
})

app.get('/help', (req, res)=>{
  res.render('help', {
    helpText: 'This is some helpful text.',
    title:'Help',
    name: "MS Dhoni"
  })
})

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must add address'
    })
  }

  forecast(13.3408, 74.7421, (error, forecastData) => {
    if(error){
      return res.send({ error })
    }
    res.send({
      forecast: forecastData,
      address: req.query.address
    })

  })
});

app.get('/product', (req,res)=>{
  if(!req.query.search){
    return res.send({
      error:'You must provide a search term'
    })
  }

  console.log(req.query.search);
  res.send({
    products:[]
  })
})

app.get("/help/*", (req,res)=>{
  res.render('404',{
    title: '404',
    name: 'MS Dhoni',
    errorMessage: 'Help article not found'
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    title: '404',
    name: 'MS Dhoni',
    errorMessage:"Page not found"
  })
})

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
