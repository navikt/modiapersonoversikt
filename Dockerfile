FROM ghcr.io/navikt/modialogin/modialogin-frontend:6673b4df4e100950a1022e8fe2ca76ca3267f2aa-beta
ADD proxy.json /proxy-config.json
COPY build /www
