FROM node:9.5 as nodebuilder
ADD / /source
WORKDIR /source
RUN npm install
RUN npm run build

FROM docker.adeo.no:5000/pus/nginx
COPY --from=nodebuilder /source/build /usr/share/nginx/html
