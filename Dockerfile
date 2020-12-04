FROM docker.pkg.github.com/navikt/pus-fss-frontend/pus-fss-frontend:87ade495b194654556895a5319aa58b35ea084c2
ADD config.yaml /config.yaml
COPY build /app/public
