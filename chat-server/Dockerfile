# Use a imagem do Node.js
FROM node:14

# Crie um diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários para o diretório de trabalho
COPY server.js /app/

# Instale as dependências
RUN npm install ws 

# Expõe a porta 8080
EXPOSE 8080

# Inicia o servidor WebSocket
CMD ["node", "server.js"]
