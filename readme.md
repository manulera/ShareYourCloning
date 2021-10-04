# Readme

A web application to generate molecular cloning strategies in json format, and share them with others.

For information on the backend see [this](./src/backend/readme.md)

For information on the frontend see [this](./src/frontend/readme.md)

## Vscode Settings

If you want to have the same environment for development that I am using, you can create a folder in the main directory called `.vscode`, there you should create a file `settings.json` as below

You will have to change `path/to/python/environment/bin/` by the location of the bin folder of the virtual environment created by pipenv. For that, go to `src/backend/` and run `pipenv shell` to activate the virtual environment (after you have installed the dependencies), and then run `which python`.

```json
{
    "files.exclude": {
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/.DS_Store": true,
        "**/*.pyc": true,
        "**/__pycache__": true
    },
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.flake8Path": "path/to/python/environment/bin/flake8",
    "python.pythonPath": "path/to/python/environment/bin/python",
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
     },
     "eslint.nodePath": "./src/frontend/node_modules",
     "eslint.options": { "overrideConfigFile": "./src/frontend/.eslintrc.json"},
     "eslint.format.enable": true,
     "[javascript]": {
         "editor.defaultFormatter": "dbaeumer.vscode-eslint"
     },
     "[javascriptreact]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    }
}
```

## Docker container

This is in the making, just ignore it for now.

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
