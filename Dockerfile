FROM ghcr.io/navikt/modialogin/modialogin-frontend:dc33c5b0b6067a7d4be6a78c8fbb75d891a377fd-beta
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
