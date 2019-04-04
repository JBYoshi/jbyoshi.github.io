#!/bin/sh
# To register:
# cd .git/hooks && ln -s ../../pre-commit.sh pre-commit
if gpg --list-secret-keys --with-colons | grep -i ^fpr:.*:e72640d09d0ca9eea09879c5468c80811bcc9a6a: > /dev/null
then
    gpg --armor --export e72640d09d0ca9eea09879c5468c80811bcc9a6a > pgp-key.txt
    git add pgp-key.txt
fi
