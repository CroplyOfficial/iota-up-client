echo "installing packages..."
npm ci 
echo "creating prod build..."
npm run buildsh
echo "stop existing deployment..."
pm2 delete deploy
echo "deploy built frontend to prod..."
pm2 start deploy.js
