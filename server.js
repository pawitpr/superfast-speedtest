const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    socket.write(data); // Echo back the data to the client
  });
});

server.listen(8080, () => {
  console.log('TCP server listening on port 8080');
});
