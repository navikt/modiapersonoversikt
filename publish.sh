#!/bin/sh

set -e

rm -rf lib/
npm version --no-git-tag-version $@.0.0
npm ci
npm run compile
npm --verbose publish
