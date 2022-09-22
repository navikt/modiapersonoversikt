FROM ghcr.io/navikt/modialogin/modialogin-frontend:a55d2c20c5583738aa736691dba43df0ca7d7f38
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
