FROM ghcr.io/navikt/modialogin/modialogin-frontend:a7cce8c53f647bfbc544eb8caeb7e41f8edce2e8
ADD proxy.json /proxy-config.json
COPY build /www
