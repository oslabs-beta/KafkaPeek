const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
//--------creating socket.IO connection--------
const { createServer } = require('http')
const { Server } = require('socket.io');
const { response } = require('express');
const cors = require('cors')
const ioConfig = {
  cors: {
    origin: ['*'],
  },
}

const httpServer = createServer(app)
const io = new Server(httpServer, ioConfig)

const { fetchQuery } = require('./queries')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/assets')));

// serving html to localhost:3000
app.get('/', (req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname, '/../client/index.html'));
  });
  
app.get('/dist/bundle.js', (req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname, '../dist/bundle.js'));
});

//--------define parameters to query on websocket---------

const params = {
  1: ['kafka_server_broker_topic_metrics_bytesinpersec_rate','[5m:10s]'],
  2: ['kafka_server_broker_topic_metrics_bytesoutpersec_rate','[5m:10s]'],
  3: ['kafka_server_broker_topic_metrics_messagesinpersec_rate','[5m:10s]'],
  4: ['kafka_log_size','[5m:10s]'],
}

//--------initialize socket.io connection to front end-------

io.on('connection', (socket) => {
  console.log('a new user connected');
  //emit fetch request every 5 seconds
  socket.on('rate', (...args) => {
    // console.log({...args})
    const [ query, timeFrame ] = args;
    console.log(query, timeFrame)
    // console.log(query,'in socket.on');
    setInterval(async () => {
      const fetchData = await fetchQuery(query, timeFrame);
      // socket.emit('rate', 'hello','hello2')
      socket.emit('rate',fetchData)
    }, 3000);
  })


  // setInterval(async () => {
  //   const fetchData = await fetchQuery(params['1'][0], params['1'][1]);
  //   socket.emit(`${params['1'][1]}`,fetchData)
  // }, 3000);
  //log message on disconnect
  socket.on('disconnect', () => {
    console.log('websocket to client was disconnected!')
  })
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
  
  httpServer.listen(PORT, () => console.log(`Server listening on port: ${PORT}...`));
  
  module.exports = app;
  