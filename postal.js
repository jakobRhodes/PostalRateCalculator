const express = require('express'); 
const app = express();
const port = 3000;
app.use(express.static(__dirname + "/public"));

app.set('views', 'public/views');
app.set("view engine", "ejs");

app.get('/postalRate', postal);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
   

function postal(req, res) {
    let type = req.query.mailType;   
    let weight = req.query.mailWeight;

       calculatePostageRate(res, type, weight);       
   }

function calculatePostageRate(res, type, weight) {
 let price = 0;
 switch (type) {
    case 'Letters(Stamped)' :
        if (weight <= 1) {
            price = 0.55;
        }
        else if (weight <= 2) {
            price = 0.70;
        }
        else if (weight <= 3) {
            price = 0.85;
        }
        else if (weight <= 3.5) {
            price = 1.00;
        }
    break;
    case 'Letters(Metered)' :
        if (weight <= 1) {
            price = 0.50;
        }
        else if (weight <= 2) {
            price = 0.65;
        }
        else if (weight <= 3) {
            price = 0.80;
        }
        else if (weight <= 3.5) {
            price = 0.95;
        }
    break;
    case 'Large Envelopes(Flats)' :
        if (weight <= 1) {
            price = 1.00;
        }
        else {
            price = ((weight - 1) * 0.20) + 1.00
        }
    break;
    case 'First-Class Package Service-Retail' : 
    if (weight <= 4) {
        price = 3.80;
    }
    else if (weight <= 8) {
        price = 4.60;
    }
    else if (weight <= 12) {
        price = 5.30;
    }
    else if (weight = 13) {
        price = 5.90;
    }
    break;
    case 'Postcard' :
        price = 0.35;
    break;
    case 'Keys and Identification Devices' :
        if (weight <= 1) {
            price = 3.65;
        }
        else if (weight <= 13) {
            price = ((weight - 1) * 0.20) + 3.65;
        }
        else if (weight <= 16) {
            price = 8.85;
        }
        else if (weight <= 32) {
            price = 10.75;
        }
    break;
 
 }
   price = price.toFixed(2);
   const params = {price: price, type : type, weight: weight};
   res.render('results', params);
}