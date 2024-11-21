# The classic Todo full-stack application

Frontend built using Typescript and React. Backend built using Spring Boot and Spring Security
The authentication is handled using a cookie with the JWT access token provided by the backend.

To run Docker container use commands

docker build -t todofrontend .
docker run -d -p 3000:3000 todofrontend

Site will be available at localhost:3000
