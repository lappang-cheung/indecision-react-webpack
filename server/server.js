// Importing the class
const express  = require('express');
const path = require('path');
const http = require('http');

// Variables Declaration
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();

// Rendering from Public Folder
app.use(express.static(publicPath));

// Listening to specific env port
app.listen(port, () => console.log(`Application starting on ${port}`));