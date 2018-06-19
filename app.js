var express = require('express');
var stripe = require('stripe')("#");// Secret key obtained from stripe
var ejs = require('ejs');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/paysuccess', function(req, res){
  res.render('paysuccess');
});

app.post('/charge', function(req, res){
    var token = req.body.stripeToken;
    console.log(token);
    var chargeAmount = req.body.chargeAmount;
    var charge = stripe.charges.create({
      amount : chargeAmount,
      currency : "gbp",
      source : token,
    }, function(err, charge){
        if(err ){
          console.log("Your Card has declined!!!");
        }
    });
    console.log("your payment was succesful");
    res.redirect('/paysuccess');
});

app.listen('3000', function(){
  console.log("stripe is running at 3000");
})
