#!/bin/sh

rm -rf lib/
npm ci
npm run compile
npm version --no-git-tag-version $@.0.0
npm --verbose publish
