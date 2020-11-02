#FROM docker.pkg.github.com/navikt/pus-fss-frontend/pus-fss-frontend:ed89610cb045f734f7b0279f2e4bb2b04a20614c

#ADD config.yaml /config.yaml
#COPY build /app/public
FROM docker.pkg.github.com/navikt/pus-fss-frontend/pus-fss-frontend:5a6fc07a1e4496988d272c145a78f3d5712c1d44
COPY build /app/public
