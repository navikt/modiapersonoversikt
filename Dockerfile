FROM node:9.7.1-alpine as nodebuilder
ADD / /source
WORKDIR /source
RUN yarn install --frozen-lockfile
RUN yarn build
RUN yarn build-storybook

FROM nginx:alpine
COPY --from=nodebuilder /source/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
