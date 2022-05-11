FROM ghcr.io/navikt/modialogin/modialogin-frontend:29a6e24bc8c63525ef6c76978099d8edd90f5507-beta
ADD proxy.json /proxy-config.json
COPY build /www
