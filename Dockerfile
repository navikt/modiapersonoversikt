#FROM docker.pkg.github.com/navikt/pus-fss-frontend/pus-fss-frontend:ed89610cb045f734f7b0279f2e4bb2b04a20614c

#ADD config.yaml /config.yaml
#COPY build /app/public
FROM docker.pkg.github.com/navikt/pus-fss-frontend/pus-fss-frontend:ab78243d492ce69d3391bf8afdc26f18c6113dd5
COPY build /app
