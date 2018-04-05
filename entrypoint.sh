#!/bin/bash -e

sed -i s,___HODE_URL___,$FASIT_IADECORATOR_JS_URL, /usr/share/nginx/html/index.html

exec "$@"
