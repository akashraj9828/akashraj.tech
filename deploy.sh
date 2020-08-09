rm -rf build/
yarn install
yarn build:snap
openssl aes-256-cbc -a -d -in key.pem.enc -out key.pem -k $ENC_KEY
chmod 600 key.pem
scp -o  StrictHostKeyChecking=no -P 65002 -i key.pem  -r build/* $USER@$SERVER:domains/akashraj.tech/public_html/