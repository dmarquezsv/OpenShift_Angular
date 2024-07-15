# Etapa de compilación
FROM node:latest as build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json para instalar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente y compilar la aplicación
COPY . .
RUN npm run build --prod

# Etapa de producción
FROM nginx:latest

# Copiar los archivos compilados desde la etapa de compilación
COPY --from=build /app/dist /usr/share/nginx/html

# Configurar Nginx
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
