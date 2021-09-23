FROM ghcr.io/navikt/modialogin/frontend:fae96222482a8eed4f0122300c1a5ff98d45a11b-beta
ADD proxy.nginx /nginx
COPY build /app
