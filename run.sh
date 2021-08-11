#!/bin/sh
echo "url: http://localhost:4000" > .jekyll-cache/jb-dev-config.yml
(cd .git/hooks && ln -s ../../pre-commit.sh pre-commit 2>/dev/null) || true
bundle exec jekyll serve --config _config.yml,.jekyll-cache/jb-dev-config.yml
