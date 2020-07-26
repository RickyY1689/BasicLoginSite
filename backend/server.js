const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); // Allows us to initialize environment variables in .env files

const app = express();
const port = process.env.PORT || 5000; // Set it to whatever port you want, just make sure it's different form your REACT port

app.use(cors()); // Sets up the CORS middleware 
app.use(express.json()); // Enables our server to parse JSON 

//uri is the database uri we get from the cloud atlas
const uri = process.env.ATLAS_URI;
//this establishes our connection to our database, as general setup keep both parameters below as true 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB databse connection established successfully");
})

//requiring the files and importing them 
const accountRouter = require('./routes/account');

//loads everthing in 
app.use('/account', accountRouter);

app.listen(port, () => {
    console.log('Server is running on port: ${port}');
});