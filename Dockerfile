FROM ghcr.io/navikt/modialogin/modialogin-frontend:79d33993a456064d17e9920943bef682b3a7e3b2-beta
ADD proxy.json /proxy-config.json
COPY build /www
