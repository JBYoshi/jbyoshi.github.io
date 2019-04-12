#!/bin/sh
(cd .git/hooks && ln -s ../../pre-commit.sh pre-commit)
bundle exec jekyll serve