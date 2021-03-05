FROM docker.pkg.github.com/navikt/pus-fss-frontend/pus-fss-frontend:ecd23b296051ce8d436025e242b79521d9244b32
ADD config.yaml /config.yaml
COPY build /app/public
