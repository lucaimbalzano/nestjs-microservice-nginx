# Use the official lightweight Nginx image
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Expose the default Nginx HTTP port
EXPOSE 80

# Run Nginx in the foreground (so Docker keeps the container running)
CMD ["nginx", "-g", "daemon off;"]
