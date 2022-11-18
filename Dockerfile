FROM ghcr.io/navikt/modialogin/modialogin-frontend:9493033dfcd824c6536101dd569985663cf88ffa-beta
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
