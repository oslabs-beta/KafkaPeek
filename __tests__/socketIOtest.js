const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const { httpServer } = require('../server/server');
const { fetchQuery, resetCounter } = require('../server/queries');
describe("Testing Zurau websocket", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("should work", (done) => {
    clientSocket.on("health", (arg) => {
      expect(arg).toBe("world");
      done();
    });
    serverSocket.emit("health", "world");
  });

  test("should work (with ack)", (done) => {
    serverSocket.on("hi", (cb) => {
      cb("hello");
    });
    clientSocket.emit("hi", (arg) => {
      expect(arg).toBe("hello");
      done();
    });
  });
});