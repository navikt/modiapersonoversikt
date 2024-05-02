FROM europe-north1-docker.pkg.dev/nais-management-233d/personoversikt/modia-frontend:0.10-node
ADD proxy-config-q2.json proxy-config.json
COPY build ./static
ENV STATIC_FILES_DIR=./static
