#!/bin/sh
# To register:
# cd .git/hooks && ln -s ../../pre-commit.sh pre-commit
MY_PGP_KEY=e72640d09d0ca9eea09879c5468c80811bcc9a6a
if gpg --list-secret-keys --with-colons | grep -i ^fpr:.*:$MY_PGP_KEY: > /dev/null
then
    if ! gpg --armor --export $MY_PGP_KEY | cmp --silent pgp-key.txt - > /dev/null
    then
        echo ERROR: PGP key has been changed. Run submit-gpg-key.sh to update.
        exit 1
    fi
fi
