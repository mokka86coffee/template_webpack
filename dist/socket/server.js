const fs = require("fs");
const http = require("http");
const Websocket = require("websocket").server;

const index = fs.readFileSync("./index.html", "utf8");
const server = http
  .createServer((req, res) => {
    res.writeHead(200);
    res.end(index);
  })
  .listen(2006);

const clients = [];
const websocket = new Websocket({
  httpServer: server,
  autoAcceptConnections: false
});

websocket.on("request", req => {
  const connection = req.accept("", req.origin);
  clients.push(connection);
  clients.forEach(client => client.send(clients.length));

  connection.on("message", handleOnConnection.bind(this, connection));

  connection.on("close", (code, descr) => console.log(code, descr));
});

function handleOnConnection(connection, message) {
  console.log(message);
  const data = message[`${message.type}Data`];

  clients.forEach(client => (connection !== client ? client.send(data) : null));
}
