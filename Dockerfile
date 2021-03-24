FROM docker.pkg.github.com/navikt/modialogin/frontend:c04af997cb7e859a17422c2c7bae9cfdce76988f
ADD proxy.nginx /nginx
COPY build /app
