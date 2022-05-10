FROM ghcr.io/navikt/modialogin/modialogin-frontend:b81885f14ef9a858c6a3f9caf64cad71098f25d0
ADD proxy.json /proxy-config.json
COPY build /www
