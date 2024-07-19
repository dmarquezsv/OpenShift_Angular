# Import the base image as UBI-Nodejs 18 image
FROM node:21 as builder

# Set the working directory to /project
WORKDIR /app

# Add application files in container 
COPY . .
RUN npm install
RUN npm run build --prod

FROM bitnami/nginx as ngi

# Copy the Nginx configuration file
COPY nginx.conf /opt/bitnami/nginx/conf/nginx.conf

# Copy the built Angular application from the builder stage
COPY --from=builder /app/dist/frontend-angular-v17/ /usr/share/nginx/html

# Expose the port that Nginx will run on
EXPOSE 8081

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]