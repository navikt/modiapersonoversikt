FROM ghcr.io/navikt/modialogin/modialogin-frontend:2c87cba8716c8f84f21dfa62a516cdf72de03099-beta
ADD proxy.json /proxy-config.json
COPY build /www
