# Etapa de compilación
FROM node:21 as builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración de npm
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación Angular en modo producción
RUN npm run build --prod

# Etapa de producción
FROM bitnami/nginx:latest

# Copiar los archivos compilados desde la etapa de compilación
COPY --from=builder /app/dist/frontend-angular-v17/ /opt/bitnami/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /opt/bitnami/nginx/conf/nginx.conf

# Copiar mime.types si lo tienes localmente
COPY mime.types /opt/bitnami/nginx/conf/mime.types

# Exponer el puerto 8081 para Nginx
EXPOSE 8081

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]