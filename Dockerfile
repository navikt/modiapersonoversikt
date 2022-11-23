FROM ghcr.io/navikt/modialogin/modialogin-frontend:4575ab07d4f869f01eac3da1de3b9ba0c57a3a85
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
