#!/bin/sh -e


sed -i s,%REACT_APP_HODE_URL%,${IADECORATOR_JS_URL:-$REACT_APP_HODE_URL}, /usr/share/nginx/html/modiapersonoversikt/index.html
sed -i s,%REACT_APP_MODIA_URL%,${PERSONOVERSIKTAPI_URL:-$REACT_APP_MODIA_URL}, /usr/share/nginx/html/modiapersonoversikt/index.html
sed -i s,%REACT_APP_MOCK_ENABLED%,$REACT_APP_MOCK_ENABLED, /usr/share/nginx/html/modiapersonoversikt/index.html
sed -i s,%DOCKER_PORT%,${PORT:-80}, /etc/nginx/conf.d/default.conf

exec "$@"
