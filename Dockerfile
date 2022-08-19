FROM ghcr.io/navikt/modialogin/modialogin-frontend:2248431c3110367ddf9bb13c5c01ba343a42ec73
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
