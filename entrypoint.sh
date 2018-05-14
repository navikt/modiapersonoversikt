#!/bin/sh -e

sed -i s,%REACT_APP_HODE_URL%,$REACT_APP_HODE_URL, /usr/share/nginx/html/modiapersonoversikt/index.html
sed -i s,%REACT_APP_MODIA_URL%,$REACT_APP_MODIA_URL, /usr/share/nginx/html/modiapersonoversikt/index.html
sed -i s,%REACT_APP_MOCK_ENABLED%,$REACT_APP_MOCK_ENABLED, /usr/share/nginx/html/modiapersonoversikt/index.html
sed -i s,%DOCKER_PORT%,$PORT, /etc/nginx/conf.d/default.conf

exec "$@"
