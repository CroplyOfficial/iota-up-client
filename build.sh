echo "correcting config..."
cat ./src/config.ts | sed "s/localhost:5000/api.iotaup.com/" > ./src/config.temp
rm ./src/config.ts 
mv ./src/config.temp ./src/config.ts
echo "installing packages..."
npm ci 
echo "creating prod build..."
npm run build
echo "stop existing deployment..."
pm2 delete deploy
echo "deploy built frontend to prod..."
pm2 start deploy.js

