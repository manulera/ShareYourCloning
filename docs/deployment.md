# Deployment

Probably both of these should be switched to on release.

## Frontend

Commit to prod branch, that's automatically picked by netlify. A test should be added that checks that site can be built correctly and to the right directory before atempting to deploy.

## Backend

Commit to prod branch, if tests are passed, it will commit to dockerhub. Maybe the tests should also be ran on the docker container itself before deploying, otherwise some error may occur (e.g. change in python version, although that may make the container build to fail if the dependencies are not met).