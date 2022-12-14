FROM ghcr.io/navikt/modialogin/modialogin-frontend:4da23e180b24161b5b23f9b425ba8e007a0251a8
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
