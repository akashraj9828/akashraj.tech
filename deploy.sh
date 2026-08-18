#!/usr/bin/env bash

set -euo pipefail

log() {
    printf '[%s] %s\n' "$(date '+%Y-%m-%dT%H:%M:%S%z')" "$*"
}

dry_run="${DRY_RUN:-false}"
case "$dry_run" in
    1 | true | TRUE | yes | YES)
        dry_run=true
    ;;
    0 | false | FALSE | no | NO)
        dry_run=false
    ;;
    *)
        log "ERROR: DRY_RUN must be one of: true, false, 1, 0, yes, no"
        exit 2
    ;;
esac

: "${ENC_KEY:?ENC_KEY is required}"
: "${USER:?USER is required}"
: "${SERVER:?SERVER is required}"

log "Starting production build (dry_run=$dry_run)"
yarn build:snap
log "Build completed ($(find build -type f | wc -l | tr -d ' ') files)"

key_file="$(mktemp)"
cleanup() {
    rm -f "$key_file"
    log "Removed temporary SSH key"
}
trap cleanup EXIT

log "Decrypting the SSH key into a temporary file"
openssl enc -d -aes-256-cbc \
    -pbkdf2 \
    -iter 100000 \
    -in id_rsa.enc \
    -out "$key_file" \
    -pass env:ENC_KEY
chmod 600 "$key_file"

if ! ssh-keygen -y -f "$key_file" >/dev/null 2>&1; then
    log "ERROR: Decrypted file is not a valid SSH private key"
    exit 1
fi

log "SSH key is ready"

if [[ "$dry_run" == true ]]; then
    log "Dry run enabled; skipping copy to $USER@$SERVER"
    exit 0
fi

deploy_dir="domains/akashraj.tech/public_html/portfolio/"
log "Synchronizing build files to $USER@$SERVER:$deploy_dir"
# --delete is deliberately scoped to the portfolio directory, so files from
# other applications in public_html are never removed by this deployment.
rsync -az --delete \
    -e "ssh -o StrictHostKeyChecking=no -p 65002 -i $key_file" \
    build/ "$USER@$SERVER:$deploy_dir"
log "Deployment completed successfully"
