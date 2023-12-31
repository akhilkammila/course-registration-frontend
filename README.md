npm run build
docker build -f Dockerfile.prebuilt -t course-registration-frontend:1 .
docker run -d -p 3000:80 course-registration-frontend:1