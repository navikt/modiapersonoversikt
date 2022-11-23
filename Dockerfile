FROM ghcr.io/navikt/modialogin/modialogin-frontend:0d262a12acc1052fb5d37f4144f635b17585b850
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
