FROM docker.pkg.github.com/navikt/modialogin/frontend:b45fb6d0e596cbcdb25afaf5b539fc3d7c3a42ec-beta
ADD config.yaml /config.yaml
ADD proxy.nginx /nginx
COPY build /app
