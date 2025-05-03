#!/bin/sh
MY_PGP_KEY=e72640d09d0ca9eea09879c5468c80811bcc9a6a

gpg --keyserver hkp://pgp.mit.edu --send-keys $MY_PGP_KEY
gpg --keyserver hkp://keyserver.ubuntu.com --send-keys $MY_PGP_KEY
gpg --keyserver hkp://keys.openpgp.org --send-keys $MY_PGP_KEY

keybase pgp update

gpg --armor --export $MY_PGP_KEY > `dirname $0`/pgp-key.txt
gpg --armor --export $MY_PGP_KEY | pbcopy

echo "The automatic steps are done. Manual steps:"
echo "- Replace the GPG key on the following sites (it's copied to the clipboard):"
echo "  - https://github.com/settings/keys"
echo "  - https://gitlab.com/-/user_settings/gpg_keys"
echo "- Commit and push pgp-key.txt"
