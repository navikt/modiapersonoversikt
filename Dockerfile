FROM ghcr.io/navikt/modialogin/modialogin-frontend:13bb4e101997429eeef15066dd60fc9580b31cc6
ADD proxy.json /proxy-config.json
COPY build /www
