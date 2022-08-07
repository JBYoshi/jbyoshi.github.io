#!/bin/sh
MY_PGP_KEY=e72640d09d0ca9eea09879c5468c80811bcc9a6a

gpg --keyserver hkp://pgp.mit.edu --send-keys $MY_PGP_KEY
gpg --keyserver hkp://keyserver.ubuntu.com --send-keys $MY_PGP_KEY
gpg --keyserver hkp://keys.openpgp.org --send-keys $MY_PGP_KEY

keybase pgp update

gpg --armor --export $MY_PGP_KEY > `dirname $0`/pgp-key.txt
echo "Commit and push pgp-key.txt to finish"
