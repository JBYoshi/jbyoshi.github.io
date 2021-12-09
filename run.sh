#!/bin/sh
test -n "$JB_ANALYTICS_DOMAIN" || JB_ANALYTICS_DOMAIN=
cat - > .jekyll-cache/jb-dev-config.yml << EOF
jbanalytics: "$JB_ANALYTICS_DOMAIN"
EOF
(cd .git/hooks && ln -s ../../pre-commit.sh pre-commit 2>/dev/null) || true
bundle exec jekyll serve --config _config.yml,.jekyll-cache/jb-dev-config.yml --port 3999
