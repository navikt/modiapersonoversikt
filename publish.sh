#!/bin/sh

# Brukes av jenkins for publisering av npm-lib
set -e
set -x
AUTH_TOKEN=${NPM_AUTH}
echo ${AUTH_TOKEN}

rm -rf lib/
npm version --no-git-tag-version $@.0.0
npm ci
npm run build-library

npm config set '//repo.adeo.no/repository/npm-internal/:_authToken' ${AUTH_TOKEN}
npm --verbose publish
