FROM ghcr.io/navikt/modialogin/modialogin-frontend:486149d77668084f0f19510c27cf2aa941004f40-beta
ADD proxy.json /proxy-config.json
COPY build /www
