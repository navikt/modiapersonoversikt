FROM ghcr.io/navikt/modialogin/modialogin-frontend:ba8129423b4c8d49ebe957ff5cd4239d152354fe-beta
ADD proxy.json /proxy-config.json
COPY build /www
