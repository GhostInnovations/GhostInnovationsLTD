FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY robots.txt /usr/share/nginx/html/robots.txt
COPY sitemap.xml /usr/share/nginx/html/sitemap.xml
COPY CSS/ /usr/share/nginx/html/CSS/
COPY JS/ /usr/share/nginx/html/JS/
COPY Images/ /usr/share/nginx/html/Images/

EXPOSE 80
