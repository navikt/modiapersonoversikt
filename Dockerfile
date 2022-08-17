FROM ghcr.io/navikt/modialogin/modialogin-frontend:2c8869f435eac35a97966e5ba361d787c4251bef
ADD proxy.json /proxy-config.json
COPY build /www
