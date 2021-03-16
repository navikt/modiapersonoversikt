FROM docker.pkg.github.com/navikt/modialogin/frontend:481430eeb101cb2ee66478e1f95002c5f324eda8-beta
ADD config.yaml /config.yaml
COPY build /app
