FROM ghcr.io/navikt/modialogin/modialogin-frontend:d59aa33d2832b6a1f3a005c9ec8da6363b4f593f
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
