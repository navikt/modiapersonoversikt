FROM ghcr.io/navikt/modialogin/frontend:d083a664663cc8af4f3c53e708f169624176f286-beta
ADD proxy.nginx /nginx
COPY build /app
