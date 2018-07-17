#!/bin/sh -e

sed -i s,%REACT_APP_HODE_URL%,${$REACT_APP_HODE_URL:-"/internarbeidsflatedecorator/js/head.min.js"}, /usr/share/nginx/html/modiapersonoversikt/index.html
sed -i s,%REACT_APP_MODIA_URL%,${REACT_APP_MODIA_URL:-"/modiabrukerdialog/rest"}, /usr/share/nginx/html/modiapersonoversikt/index.html
sed -i s,%REACT_APP_MOCK_ENABLED%,$REACT_APP_MOCK_ENABLED, /usr/share/nginx/html/modiapersonoversikt/index.html
sed -i s,%DOCKER_PORT%,${PORT:-80}, /etc/nginx/conf.d/default.conf

exec "$@"
