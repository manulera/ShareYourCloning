# Backend API

A python api built with flask to do *in silico* cloning.

## How to install locally

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

```

Now you should be able to run the api in the debug mode by doing:

```bash
# These commands are also in the file run_app.sh
export FLASK_APP=app.py
export FLASK_ENV=development
flask run
```
