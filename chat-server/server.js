const os = require('os');
const fs = require('fs');
const numCPUs = os.cpus().length; 

const threads = numCPUs > 1 ? numCPUs - 1 : 1;

isFirstWrite = true;
const leakedMessages = [];

const printMemoryUsage = () => {
    const usedMemory = process.memoryUsage();
    const data = `${formatBytes(usedMemory.rss)},${formatBytes(usedMemory.heapTotal)},
    ${formatBytes(usedMemory.heapUsed)},${formatBytes(usedMemory.external)}\n`;
    if (isFirstWrite) {
        fs.writeFileSync('memoryused.csv', 'RSS,Heap Total,Heap Used,External\n');
        isFirstWrite = false;
      }
    fs.appendFile('memoryused.csv', data, (err) => {
      if (err) throw err;
      console.log('Data appended to memoryused.csv');
    });
  
};
  
const formatBytes = (bytes) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (bytes >= 1024 && i < units.length - 1) {
      bytes /= 1024;
      i++;
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
  };

  
const cluster = require('cluster');
if (cluster.isMaster) {
  for (let i = 0; i < threads; i++) {
    cluster.fork();
  }
} else {
  const WebSocket = require('ws');

  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('Received:', message.toString());
      leakedMessages.push(message);   
      setInterval(() => {
        printMemoryUsage();
      }, 5000);   
    });
  });
}
