echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r -i /Users/macbook/Desktop/test dist/* root@167.99.74.201:/var/www/html/
echo "Done!"