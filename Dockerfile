FROM node:9.5 as nodebuilder
ADD / /source
WORKDIR /source
RUN npm install
RUN npm run build

FROM nginx
COPY --from=nodebuilder /source/build /usr/share/nginx/html

