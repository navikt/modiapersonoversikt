FROM node:10.3.0-alpine as nodebuilder

ADD / /source
WORKDIR /source
RUN npm ci

ENV NODE_ENV=production
RUN npm run build

FROM navikt/pus-fss-frontend
COPY --from=nodebuilder /source/build /app