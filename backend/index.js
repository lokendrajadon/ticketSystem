const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
app.use(express.json({ limit: '50mb' }));

app.all('/*', (req, res, next) => {
  // CORS header support
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});


const authRoutes = require('./routes/User')
const ticketRoutes = require('./routes/Ticket')
app.use('/auth',authRoutes)
app.use('/user',ticketRoutes)

var PORT = process.env.PORT || 3051;
app.set('PORT', PORT);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.listen(PORT, (req,res,next) =>{
  console.log("Server start at port " + PORT);
})
