FROM ghcr.io/navikt/modialogin/modialogin-frontend:d667f1de71126c76bfcffc24905a3e0564cd2e2a-beta
ADD proxy.json /proxy-config.json
COPY build /www
