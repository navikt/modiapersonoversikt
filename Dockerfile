FROM node:11 as nodebuilder

ADD / /source
WORKDIR /source
RUN npm ci
RUN npm run build

FROM nginx
COPY --from=nodebuilder /source/build /usr/share/nginx/html/modiapersonoversikt
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint
ENTRYPOINT ["/entrypoint"]

# using bash over sh for better signal-handling
SHELL ["/bin/bash", "-c"]
ADD run.sh /run.sh
CMD /run.sh
