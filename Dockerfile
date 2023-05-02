FROM ghcr.io/navikt/modialogin/modialogin-frontend:51338869e1398b8c18358eeddfa373fe8327e824
ADD proxy-config.json /proxy-config.json
ADD preprod-proxy-config.json /preprod-proxy-config.json
COPY build /www
