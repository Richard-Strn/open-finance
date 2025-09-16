FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copiar dependências e instalar
COPY package*.json ./
RUN npm install

# Copiar código
COPY . .

# Expor porta da API
EXPOSE 3000

# Iniciar servidor
CMD ["npm", "start"]
