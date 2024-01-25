const express = require('express');
const configViewEngine = require('./config/viewEngine')
require('dotenv').config()
const cors = require('cors');
const app = express()
const apiRoutes = require('./router/api');
const cloudinaryConfig = require('./config/cloudinaryConfig');
const port = process.env.PORT || 3000

// confings
configViewEngine(app);
cloudinaryConfig();
const allowedOrigins = ['http://localhost:8080'];
app.use(cors({
  origin: allowedOrigins
}));
// simple query
//  api routes
app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})