FROM docker.pkg.github.com/navikt/pus-fss-frontend/pus-fss-frontend:96e5c520db3a41a77ec6f8ecf7d649dd88409e9f
ADD config.yaml /config.yaml
COPY build /app/public
