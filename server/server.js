const express = require('express');
const app = express();
const path = require('path');
const PORT = 4000;
const authRouter = require('./router/routes.js');

// socket.io
const { createServer } = require('http');
const { Server } = require('socket.io');
const { response } = require('express');
const cors = require('cors');
const ioConfig = {
  cors: {
    origin: ['http://localhost:8080'],
  },
};

const httpServer = createServer(app);
const io = new Server(httpServer, ioConfig);
const { fetchQuery, resetCounter } = require('./queries');
const { default: axios } = require('axios');

// parsing data coming from frontend
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/assets')));

// serving dynamic files
app.get('/', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '/../client/index.html'));
});

// serving bundle to link in html file
app.get('/dist/bundle.js', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '../dist/bundle.js'));
});


// initializing socket.io connection
var fetchIntervalID;
io.on('connection', (socket) => {
  console.log('a new websocket connection');
  socket.on('health', (args) => {
    fetchIntervalID = setInterval(async () => {
      const fetchObj = {};
      for (const [k, v] of Object.entries(args)) {
        fetchObj[k] = await fetchQuery(v[0], v[1], k);
      }

      socket.emit('health', fetchObj);
    }, 1000);
    console.log('Sending new metrics!');
  });

  socket.on('performance', (args) => {
    fetchIntervalID = setInterval(async () => {
      const fetchObj = {};
      for (const [k, v] of Object.entries(args)) {
        fetchObj[k] = await fetchQuery(v[0], v[1], k);
      }

      socket.emit('performance', fetchObj);
    }, 1000);
  });

  socket.on('stop', () => {
    clearInterval(fetchIntervalID);
    console.log('Metrics stopped!');
  });

  socket.on('disconnect', () => {
    clearInterval(fetchIntervalID);
    resetCounter();
    console.log('websocket to client was disconnected!');
  });
});

// routes
app.use('/auth', authRouter);

// catch all handler for unknown routes
app.use((req, res) => {
  res.status(404).send('404');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

httpServer.listen(PORT, () =>
  console.log(`Server listening on port: ${PORT}...`)
);

module.exports = { app, httpServer };
