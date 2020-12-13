FROM mhart/alpine-node as build

WORKDIR /app

COPY ./bff-service/*.json ./

RUN npm install && npm cache clean --force

COPY ./bff-service/src ./src

RUN npm run prebuild && npm run build


FROM mhart/alpine-node

WORKDIR /app

COPY ./bff-service/package.json ./

RUN npm install --production && npm cache clean --force

COPY --from=build /app/dist ./dist

CMD [ "npm", "run", "start:prod" ]

EXPOSE 3000