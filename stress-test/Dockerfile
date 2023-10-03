# Use a imagem do Node.js
FROM node:14

# Crie um diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários para o diretório de trabalho
COPY stress_test.js /app/

# Instale as dependências
RUN npm install ws

# Inicia o script de teste de estresse
CMD ["node", "stress_test.js"]
