FROM ghcr.io/navikt/modialogin/modialogin-frontend:3ce9108c2451afed91fc3527c71421331d1dafa7
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
