const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe('Zurau metrics testing', () => {
    let io, serverSocket, clientSocket;

    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`)
        })
    })
})