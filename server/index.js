const WebSocket = require("ws");
const uuidv4 = require("uuid").v4;

const server = new WebSocket.Server({ port: 8080 });

const connections = {};

const broadcast = (data) => {
   Object.keys(connections).forEach((uuid) => {
      const connection = connections[uuid];
      connection.send(`${data}`);
   });
};

const handleClose = (uuid) => {
   delete connections[uuid];
};

// Listens for a connection
server.on("connection", (ws) => {
   const uuid = uuidv4();
   connections[uuid] = ws;

   ws.on("message", (message) => broadcast(message));
   ws.on("close", () => handleClose(uuid));
});
