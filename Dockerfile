FROM node:9.5
ADD / /source
WORKDIR /source
RUN yarn build
RUN yarn global add serve

CMD serve -s build/