FROM docker.pkg.github.com/navikt/modialogin/frontend:55621b946e60d88a9d689be63a6c09f09ac9fb69-beta
ADD config.yaml /config.yaml
ADD proxy.nginx /nginx
COPY build /app
