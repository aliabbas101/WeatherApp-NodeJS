const path= require('path');
const express= require('express');
const hbs=require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app=express();
const port= process.env.PORT || 3000;

//Define paths for Express Configuration
const publicDir=path.join(__dirname,'../public');
const viewsPath= path.join(__dirname,'../templates/views');
const partialsPath= path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//Setting up static(Client-Side) files to serve
app.use(express.static(publicDir));

app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather Application Home',
        name:'Ali Abbas'
    });
});

app.get('/about', (req,res)=>{
    res.render('about',{
        title:"About",
        name:"Ali Abbas"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title:"Help",
        helpText:"We are available to help you out !",
        name:"Ali Abbas"
    })
});



app.get('/weather', (req, res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"No Address was provided"
        });
    }

    geocode(req.query.address, (error, {lat, long, location}={})=>{
        if(error)
        {
            return res.send({error});
        }
        forecast(lat, long, (error, data)=>{
            if(error)
            {
                return res.send({error});
            }
            res.send({
                location,
                forecast:data,
                address:req.query.address
            })
        });
    });
});

app.get('/products', (req, res)=>{

    if(!req.query.search)
    {
        return res.send({
            error:"You must provide a search PARAM"
        })
    }
    console.log(req.query);
    res.send({ 
        products:[]
    })
});



app.get("/help/*", (req,res)=>{
    res.render("404", {
        title:"404 Help",
        name:"Ali Abbas",
        errorMsg:"Error 404: Help Article not found"

    });
});

app.get('*', (req,res)=>{
    res.render("404", {
        title:"Error: 404",
        name:"Ali Abbas",
        errorMsg:"Error 404: Page not found"

    });
});

app.listen(port,()=>{
    console.log("Server Started on port: "+port);
});