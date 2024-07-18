# Import the base image as UBI-Nodejs 18 image
FROM node:21 as builder

# Set the working directory to /project
WORKDIR /project

# Copy package files in container currunt direcctory
COPY --chown=1001:1001 package.json package-lock.json ./


# Install all Angular dependacies
RUN npm ci

# Add application files in container 
COPY . .

# Set permision of .angular file in container
VOLUME ["/project/.angular"]

# Open port to allow traffic in container
EXPOSE 8081

# Run start script using npm command
CMD ["npm", "start"]