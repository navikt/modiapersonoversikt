#!/bin/bash -e

sed -i s,___HODE_URL___,$FASIT_IADECORATOR_JS_URL, /usr/share/nginx/html/index.html
sed -i s,___API_BASE_URI___,$FASIT_PERSONOVERSIKTAPI_URL, /usr/share/nginx/html/index.html

exec "$@"
