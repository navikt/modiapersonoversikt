FROM docker.pkg.github.com/navikt/modialogin/frontend:74fc2176abbc8caa69346a60e6c1588c8d56b986-beta
ADD config.yaml /config.yaml
ADD proxy.nginx /nginx
COPY build /app
