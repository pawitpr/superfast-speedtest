const net = require('net');

const message = Buffer.alloc(1024 * 1024); // 1 MB message
const numMessages = 1000; // Number of messages to send
let messagesSent = 0;
let messagesReceived = 0;
let startTime = null;

const client = net.connect({ port: 8080 }, () => {
  console.log('TCP client connected');
});

client.on('data', (data) => {
  messagesReceived++;
  if (messagesReceived === numMessages) {
    const endTime = Date.now();
    const elapsed = (endTime - startTime) / 1000;
    const speedMbps = ((numMessages * message.length * 8) / (elapsed * 1000000)).toFixed(2);
    console.log(`TCP speed test completed: ${numMessages} messages sent/received in ${elapsed} seconds (${speedMbps} Mbps)`);
    client.end();
  }
});

client.on('end', () => {
  console.log('TCP client disconnected');
});

startTime = Date.now();
while (messagesSent < numMessages) {
  client.write(message);
  messagesSent++;
}
