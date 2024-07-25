echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r -i /Users/macbook/Desktop/test dist/* root@188.166.213.81:/var/www/html/
echo "Done!"