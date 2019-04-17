#!/bin/sh
(cd .git/hooks && ln -s ../../pre-commit.sh pre-commit 2>/dev/null) || true
bundle exec jekyll serve