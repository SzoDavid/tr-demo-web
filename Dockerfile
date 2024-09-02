FROM node:20.16.0 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm install -g @angular/cli
RUN ng build --configuration=production

FROM nginx:latest

COPY --from=build /app/dist/tr-demo-web/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
