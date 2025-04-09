# Use an official Nginx image as a base
FROM nginx:alpine

# Copy the built files to the Nginx HTML directory
COPY dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80
