// import regeneratorRuntime from 'regenerator-runtime';

const regeneratorRuntime = require('regenerator-runtime')
module.exports = () => {
  global.testServer = require('./server');
};