FROM ghcr.io/navikt/modialogin/modialogin-frontend:2248431c3110367ddf9bb13c5c01ba343a42ec73
ADD proxy-config.json /proxy-config.json
ADD q0-proxy-config.json /q0-proxy-config.json
ADD q1-proxy-config.json /q1-proxy-config.json
COPY build /www
