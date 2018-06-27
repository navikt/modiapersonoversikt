#!/bin/sh

set -e
set -x

rm -rf lib/
npm run compile

npm --verbose publish
