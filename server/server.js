const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// serving html to localhost:3000
app.get('/', (req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname, '/../client/index.html'));
  });
  
app.get('/dist/bundle.js', (req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname, '../dist/bundle.js'));
});


// catch all handler for all unknown routes
app.use((req, res) => {
    res.status(404).send('404');
  });
  
// global error handler catches all errors
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });
  
  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}...`));
  
  module.exports = app;
  