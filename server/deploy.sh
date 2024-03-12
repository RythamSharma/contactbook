echo "building docker file"
docker build . -t rytham/contactbook:latest
docker push rytham/contactbook:latest
echo "build complete"