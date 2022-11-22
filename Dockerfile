FROM ghcr.io/navikt/modialogin/modialogin-frontend:c3aace2d4f6cfa56f8eadb5591f3803c69da0217
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
