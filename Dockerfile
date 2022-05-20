FROM ghcr.io/navikt/modialogin/modialogin-frontend:6b26a2553dca7c0f5787578fa776334e9cd8c7cb
ADD proxy.json /proxy-config.json
COPY build /www
