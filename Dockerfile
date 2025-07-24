# Etapa 1: build dos arquivos estáticos
FROM node:20.16.0-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servir com nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Etapa 2: nginx para servir os arquivos
FROM nginx:alpine

# Copia os arquivos buildados para a pasta padrão do nginx
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
