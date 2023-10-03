const WebSocket = require('ws');

const numClients = 100;

const clients = [];

function connectClient() {
  const ws = new WebSocket('ws://chat-server:8080'); // Nome do host do servidor WebSocket no Docker Compose

  ws.on('open', () => {
    console.log('Connected');
    clients.push(ws);

    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 1000); // Gera um número aleatório
      ws.send(`Random number: ${randomNumber}`); // Envia o número aleatório como mensagem
    }, 1);
  });

  ws.on('close', () => {
    console.log('Connection closed');
  });

  ws.on('error', (error) => {
    console.error('Error:', error.message);
  });
}

for (let i = 0; i < numClients; i++) {
  connectClient();
}
