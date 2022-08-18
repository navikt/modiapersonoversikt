FROM ghcr.io/navikt/modialogin/modialogin-frontend:00a5a93a48dac4e3e58d3f52bb0550ee5bf41546-beta
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config
COPY build /www
