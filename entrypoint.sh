#!/bin/sh -e

sed -i s,%REACT_APP_HODE_URL%,$IADECORATOR_JS_URL, /usr/share/nginx/html/modiapersonoversikt/index.html
sed -i s,%REACT_APP_MODIA_URL%,$PERSONOVERSIKTAPI_URL, /usr/share/nginx/html/modiapersonoversikt/index.html

exec "$@"
