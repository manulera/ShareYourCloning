# Readme

A python api built with flask to do *in silico* cloning.

## How to install locally

### Backend flask app

You should have python 3.9 installed in your machine.

For the management of the dependencies I used `pipenv`, if you don't have it:

```
pip3 install pipenv
```

Then go to `src/backend/` and:

```bash
# This should install the dependencies and create a virtual environment
pipenv install

# Activate the virtual environment
pipenv shell

# Somehow, for me the module flask_cors was not properly installed by pipenv,
# so I had to do this in the virtual environment
pip install flask_cors
```

Now you should be able to run the backend by doing:
```

```






### Build the container

You will have to give the container a name (I used elifesprint), and build it from the `Dockerfile`

```
# In the directory where Dockerfile is located we build the image
docker build -t elifesprint .

# To explore the file system (this leaves the container on)
docker run -dit --name elifesprint elifesprint
docker exec -it elifesprint bash
```

## What I installed with pipenv
