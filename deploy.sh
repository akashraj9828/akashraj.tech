#!/usr/bin/env bash

set -euo pipefail

: "${ENC_KEY:?ENC_KEY is required}"
: "${USER:?USER is required}"
: "${SERVER:?SERVER is required}"

yarn build:snap

key_file="$(mktemp)"
trap 'rm -f "$key_file"' EXIT
openssl aes-256-cbc -a -d -in key.pem.enc -out "$key_file" -pass env:ENC_KEY
chmod 600 "$key_file"

scp -o StrictHostKeyChecking=no -P 65002 -i "$key_file" -r build/* "$USER@$SERVER:domains/akashraj.tech/public_html/"
