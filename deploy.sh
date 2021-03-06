rm -rf build/
yarn install
yarn build:snap
openssl aes-256-cbc -a -d -in key.pem.enc -out key.pem -k $ENC_KEY
chmod 600 key.pem
# clear old files
# ssh -o StrictHostKeyChecking=no -i key.pem -p 65002 $USER@$SERVER "rm -rf domains/akashraj.tech/public_html/static/*"
# upload build files
scp -o  StrictHostKeyChecking=no -P 65002 -i key.pem  -r build/* $USER@$SERVER:domains/akashraj.tech/public_html/