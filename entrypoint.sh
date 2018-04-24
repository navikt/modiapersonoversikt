#!/bin/sh -e

sed -i s,___HODE_URL___,$IADECORATOR_JS_URL, /usr/share/nginx/html/modiapersonoversikt/index.html
sed -i s,___API_BASE_URI___,$PERSONOVERSIKTAPI_URL, /usr/share/nginx/html/modiapersonoversikt/index.html

exec "$@"
