FROM ghcr.io/navikt/modialogin/modialogin-frontend:8e69353caa4e0c8cfeafa3359984556684d8f7fd-beta
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
