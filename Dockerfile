FROM node:18-alpine

WORKDIR /app

# Copy package files from the src directory
COPY src/package*.json ./

RUN npm install --production

# Copy application source code from src
COPY src/ ./

EXPOSE 8080

CMD ["node", "server.js"]