const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });

const PORT = process.env.PORT || 4000;
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  }

app.use(bodyParser.json());
app.use(cors(corsOptions));

//DB Connection
mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch(() => console.log(`DB not connected`));

//Import Routes
const UploadRoute = require('./routes/upload');
const AddToCartRoute = require('./routes/add-to-cart');

//Routes
//For testing purposes
//app.get('/', (req, res) => res.send('We are on app.js'));
app.use('/upload', UploadRoute);
app.use('/addToCart', AddToCartRoute);