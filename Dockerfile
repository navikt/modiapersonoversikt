FROM docker.pkg.github.com/navikt/pus-fss-frontend/pus-fss-frontend:065b2498205dc2ed17d88d2be0bbda1c4b7a7027
ADD config.yaml /config.yaml
COPY build /app/public
#FROM docker.pkg.github.com/navikt/pus-fss-frontend/pus-fss-frontend:5a6fc07a1e4496988d272c145a78f3d5712c1d44
#COPY build /app/public
