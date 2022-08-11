FROM ghcr.io/navikt/modialogin/modialogin-frontend:33b01c627ce7f5d55b60cf7e1d32bca118fb4700-beta
ADD proxy.json /proxy-config.json
COPY build /www
