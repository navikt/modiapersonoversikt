FROM ghcr.io/navikt/modialogin/modialogin-frontend:2471b9dd3667ba9235496db4a243c9ac938b2deb-beta
ADD proxy.json /proxy-config.json
COPY build /www
