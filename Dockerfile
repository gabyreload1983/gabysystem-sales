FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY ./gabysystem.sales.conf /etc/nginx/conf.d

COPY ./dist /usr/share/nginx/html/sales

