FROM ghcr.io/navikt/modialogin/modialogin-frontend:af484a083023c4caa730b0d3619f6532cfa2ddbc
ADD proxy.json /proxy-config.json
COPY build /www
