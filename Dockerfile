FROM node:21 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/frontend-angular-v17/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]