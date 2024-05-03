FROM europe-north1-docker.pkg.dev/nais-management-233d/personoversikt/modialogin:2024.01.04-09.48-46cd9d7
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
