# Etapa de compilación
FROM node:20-alpine as build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación Angular en modo producción
RUN npm run build --configuration production

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos compilados desde la etapa de compilación
COPY --from=build /app/dist/frontend-angular-v17 /usr/share/nginx/html

# Configurar Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
