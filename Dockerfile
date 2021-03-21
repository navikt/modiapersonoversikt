FROM docker.pkg.github.com/navikt/modialogin/frontend:abc66b3132bfeb5e16586a40956e5a3799ba739a-beta
ADD config.yaml /config.yaml
ADD proxy.nginx /nginx
COPY build /app
