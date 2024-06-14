FROM europe-north1-docker.pkg.dev/nais-management-233d/personoversikt/modialogin:2024.06.05-09.00-e08afd9
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
