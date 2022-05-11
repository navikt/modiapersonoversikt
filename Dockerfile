FROM ghcr.io/navikt/modialogin/modialogin-frontend:5760d888560906b4f1eff84edc2a054f84066aef-beta
ADD proxy.json /proxy-config.json
COPY build /www
