# Readme

A web application to generate molecular cloning strategies in json format, and share them with others.

For information on the backend see [this](./src/backend/readme.md)

For information on the frontend see [this](./src/frontend/readme.md)

### Build the container

In the `Dockerfile` you might want to change your timezone (see comments)

You will have to give the container a name (I used elifesprint), and build it from the `Dockerfile`

```
# In the directory where Dockerfile is located we build the image
docker build -t elifesprint .

# To explore the file system (this leaves the container on)
docker run -dit --name elifesprint elifesprint
docker exec -it elifesprint bash
```

## What I installed with pipenv
