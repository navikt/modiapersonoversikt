#!/usr/bin/env sh
set -e

_shutdown_() {
  # https://github.com/kubernetes/contrib/issues/1140
  # https://github.com/kubernetes/kubernetes/issues/43576
  # https://github.com/kubernetes/kubernetes/issues/64510
  # https://nav-it.slack.com/archives/C5KUST8N6/p1543497847341300
  echo "shutdown initialized, allowing incoming requests for 5 seconds before continuing"
  sleep 5
  nginx -s quit
  wait "$pid"
}
trap _shutdown_ SIGTERM

envsubst '$PORT' < /etc/nginx/conf.d/server.template > /etc/nginx/conf.d/default.conf
echo "---------------------------"
echo "---------------------------"
cat /etc/nginx/conf.d/default.conf
echo "---------------------------"

nginx -g "daemon off;" &
pid=$!
wait "$pid"

