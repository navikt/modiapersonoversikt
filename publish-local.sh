#!/bin/sh

set -e
set -x

rm -rf lib/
npm run build-library

npm --verbose publish
