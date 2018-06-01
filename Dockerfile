FROM node:10.3.0-alpine as nodebuilder

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

ADD / /source
WORKDIR /source
RUN npm ci
RUN npm run build
RUN npm run build-storybook
RUN CI=true npm run test

FROM nginx:alpine
COPY --from=nodebuilder /source/build /usr/share/nginx/html/modiapersonoversikt
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint
ENTRYPOINT ["/entrypoint"]
CMD ["nginx", "-g", "daemon off;"]
