const express = require('express');
const app = express();
const path = require('path');
const PORT = 4000;

// --------------- authRoutes ---------------
const authRouter = require('./router/routes.js')



//--------creating socket.IO connection--------
const { createServer } = require('http')
const { Server } = require('socket.io');
const { response } = require('express');
const cors = require('cors')
const ioConfig = {
  cors: {
    origin: ['http://localhost:8080'],
  },
}

const httpServer = createServer(app)
const io = new Server(httpServer, ioConfig)

const { fetchQuery, resetCounter } = require('./queries')

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

// const params = {
//   bytesInPerSec: ['kafka_server_broker_topic_metrics_bytesinpersec_rate',''],
//   bytesOutPerSec: ['kafka_server_broker_topic_metrics_bytesoutpersec_rate',''],
//   messagesInPerSec: ['kafka_server_broker_topic_metrics_messagesinpersec_rate',''],
//   jvmHeapUsage: ['kafka_jvm_heap_usage{env="cluster-demo", type="used"}',''],
//   activeControllerCount: ['sum(kafka_controller_activecontrollercount)',''],
//   underRepPartitions: ['kafka_server_replica_manager_underreplicatedpartitions',''],
//   offlinePartitions: ['kafka_controller_offlinepartitionscount',''],
//   brokersRunning: ['count(kafka_server_brokerstate)','']
// }

//--------initialize socket.io connection to front end-------
var fetchIntervalID;
io.on('connection', (socket) => {
  console.log('a new user connected');
  //emit fetch request every 5 seconds

  socket.on('rate', (args) => {
   fetchIntervalID = setInterval(async () => {
      const fetchObj = {};
      for(const [k , v] of Object.entries(args)) {
        fetchObj[k] = await fetchQuery(v[0],v[1]);
      }
      
      socket.emit('rate',fetchObj)
    }, 1000);
    console.log('Sending new metrics!')
  })

  socket.on('stop', () => {
    clearInterval(fetchIntervalID);
    console.log('Metrics stopped!')
  })

  //log message on disconnect
  socket.on('disconnect', () => {
    clearInterval(fetchIntervalID)
    resetCounter()
    console.log('websocket to client was disconnected!')
  })
});

//--------------- oauth paths ----------------------------

app.use('/auth', authRouter);










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
  