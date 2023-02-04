const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const { httpServer } = require('../server/server');
const { fetchQuery, resetCounter } = require('../server/queries');
// const {params} = require('../client/containers/Health_Dashboard')
describe('Testing KafkaPeek websocket', () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test('should return kafka metrics with the right size and value', (done) => {
    clientSocket.on('health', (args) => {
      console.log(args);
      expect(args.bytesInPerSec).toHaveLength(60);
      expect(args.bytesOutPerSec).toHaveLength(60);
      expect(args.messagesInPerSec).toHaveLength(60);
      expect(args.jvmHeapUsage).toHaveLength(60);
      expect(args.activeControllerCount).toBe('1');
      expect(args.underRepPartitions).toBe('0');
      expect(args.brokersRunning).toBe('1');
      expect(args.offlinePartitions).toBe('0');
      done();
    });
    const args = {
      bytesInPerSec: [
        'kafka_server_broker_topic_metrics_bytesinpersec_rate',
        '[10m:10s]',
      ],
      bytesOutPerSec: [
        'kafka_server_broker_topic_metrics_bytesoutpersec_rate',
        '[10m:10s]',
      ],
      messagesInPerSec: [
        'kafka_server_broker_topic_metrics_messagesinpersec_rate',
        '[10m:10s]',
      ],
      jvmHeapUsage: [
        'kafka_jvm_heap_usage{env="cluster-demo", type="used"}',
        '[10m:10s]',
      ],
      activeControllerCount: [
        'sum(kafka_controller_activecontrollercount)',
        '',
      ],
      underRepPartitions: [
        'kafka_server_replica_manager_underreplicatedpartitions',
        '',
      ],
      offlinePartitions: ['kafka_controller_offlinepartitionscount', ''],
      brokersRunning: ['count(kafka_server_brokerstate)', ''],
    };

    const fetchFunc = async () => {
      const fetchObj = {};
      for (const [k, v] of Object.entries(args)) {
        fetchObj[k] = await fetchQuery(v[0], v[1]);
      }
      serverSocket.emit('health', fetchObj);
    };
    fetchFunc();
  });

  test('should work (with ack)', (done) => {
    serverSocket.on('hi', (cb) => {
      cb('hello');
    });
    clientSocket.emit('hi', (arg) => {
      expect(arg).toBe('hello');
      done();
    });
  });
});