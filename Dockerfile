FROM europe-north1-docker.pkg.dev/nais-management-233d/personoversikt/modia-frontend:1.5

ADD proxy-config-dev.json proxy-config-dev.json
ADD proxy-config-prod.json proxy-config-prod.json
COPY build ./static

ENV STATIC_FILES_DIR=./static
ENV BASE_PATH=/
