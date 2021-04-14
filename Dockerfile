FROM docker.pkg.github.com/navikt/modialogin/frontend:01a9a9790313a6a50eaffe7a0c15ec2df766d743
ADD proxy.nginx /nginx
COPY build /app
