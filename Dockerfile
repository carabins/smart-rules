FROM mhart/alpine-node:10
WORKDIR /app
COPY ./dist ./dist
COPY package.json yarn.lock package-lock.json ./

CMD ["npm","run", "dock"]
