FROM ghcr.io/navikt/modialogin/modialogin-frontend:e5e24d450bcd2fe0076fc19a3077734429700943-beta
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
