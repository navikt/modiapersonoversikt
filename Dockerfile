FROM ghcr.io/navikt/modialogin/modialogin-frontend:d8a85b849e50a2c57a4376b2fe6b67ecbdb2098d
ADD proxy.json /proxy-config.json
COPY build /www
