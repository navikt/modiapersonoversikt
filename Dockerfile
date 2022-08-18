FROM ghcr.io/navikt/modialogin/modialogin-frontend:56d2aa91ce63bb59d8ae410071d0463c6b43d1c9-beta
ADD proxy.json /proxy-config.json
COPY build /www
