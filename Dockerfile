FROM europe-north1-docker.pkg.dev/nais-management-233d/personoversikt/modialogin:2024.06.04-08.59-5ae2409
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
