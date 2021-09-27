FROM ghcr.io/navikt/modialogin/frontend:32c31d056be575ae15e3056e923a4034758469b0
ADD proxy.nginx /nginx
COPY build /app
