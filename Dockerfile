FROM docker.pkg.github.com/navikt/modialogin/frontend:2afade48c7a76813896fff5d0b6ff6ab387c4e59-beta
ADD proxy.nginx /nginx
COPY build /app
