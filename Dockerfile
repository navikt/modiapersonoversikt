FROM ghcr.io/navikt/modialogin/modialogin-frontend:c2bd219e78029647670cd8b174054e6643f371a5
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
