FROM nginx:1.23-alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /var/log/nginx && \
    touch /var/log/nginx/access.log && \
    touch /var/log/nginx/error.log