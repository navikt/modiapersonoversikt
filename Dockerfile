FROM node:10.3.0-alpine as nodebuilder

ADD / /source
WORKDIR /source
RUN npm ci
RUN npm run build

FROM nginx:alpine
COPY --from=nodebuilder /source/build /usr/share/nginx/html/modiapersonoversikt
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint
ENTRYPOINT ["/entrypoint"]

# using bash over sh for better signal-handling
SHELL ["/bin/bash", "-c"]
ADD run.sh /run.sh
CMD /run_docker.sh
