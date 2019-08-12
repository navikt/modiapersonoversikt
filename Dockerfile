FROM node:10.3.0-alpine as nodebuilder

ADD / /source
#ENV CI=true # Får eslint-warnings til å bli behandlet som errors og brekker da bygget
WORKDIR /source
RUN npm ci
ENV NODE_ENV=production
ENV REACT_APP_MODIA_URL=/modiabrukerdialog/rest
ENV REACT_APP_HODE_URL=/internarbeidsflatedecorator
RUN npm run build

FROM navikt/pus-fss-frontend
COPY --from=nodebuilder /source/build /app