FROM ghcr.io/navikt/modialogin/modialogin-frontend:aae738337582b1b8db33262cc525f34e28f7336c-beta
ADD proxy.json /proxy-config.json
COPY build /www
