#!/bin/bash
rm -rf lib/
npm run compile

npm --verbose publish
