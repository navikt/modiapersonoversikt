FROM ghcr.io/navikt/modialogin/modialogin-frontend:8959cb3b9713c5ae700c277562cf5263242bcc9c
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
