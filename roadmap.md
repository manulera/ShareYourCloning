# Roadmap

Wellcome to the roadmap of [ShareYourCloning](https://github.com/manulera/ShareYourCloning).

ShareYourCloning will be a web application to generate molecular cloning strategies and share them with others. It is the first brick in the construction of [Genestorian](https://www.genestorian.org/), a web application for model organism collections.

# Milestones

Before we dive into milestones, it is strongly recommended to read the [about](https://github.com/manulera/ShareYourCloning#about) section of the project, which explains the reasoning behind the application design.

In short, ShareYourCloning aims to provide a modular interface for the documentation of molecular cloning, where every sequence comes from a source, and every sequence can be the input of another source.

Below there are some milestone along with the (very approximate and optimistic) timeline.

## Deploy the application (asap)

Having potential contributors or users being able to try the app in their browser before bothering with installing it will definitely reduce friction, even if there are known bugs, so that is a priority.

### Todo

- [ ] Containerise the app in Docker
- [ ] Deploy the app

### How to contribute

💻 **As a developer**, if you can suggest a resource (blog post or so) on how to deploy a site with a frontend in React and/or Flask, you can create a github issue, and drop it there. It will be very much appreciated!

## Define the backbone of a source as json and in the frontend interface + documentation (before February 2021)

The modularity of the web app relies on the fact that every json object representing a source of DNA has always three fields:

* Inputs: an array with the ids of sequences of DNA used to generate the output, or empty if the source represent external import.
* Output: the id of the output sequence
* Output Index: some sources, such as an import from a fasta file or a restriction enzyme digestion may produce multiple outputs. This represents which one of them is selected.

All API entry points and frontend components that manage sources should have common parts that rely on these common fields. For the frontend, there should be an intuitive way to represent a source that links it to parent and child sequences, allows to input the necessary information for the cloning step, and to select the desired output if multiple ones exist. For the backend functions there should be also common functionality (checking that the source and sequences are correctly formatted, formatting the outputs, documentation of API entry points).

Ultimately, if a contributor wants to add a new source type, there should be some boilerplate documentation and code for the backend and frontend.

### Todo

- [ ] Find an intuitive way to represent the common features of a source in the frontend.
- [ ] Define a common structure for functions handling API entry points in the backend.
- [ ] Document API entry points.
- [ ] Leverage the documentation of API entry points to organise the request and response handling in the frontend.
- [ ] Generate a guide for contribution of a step in the frontend and backend, including what documentation to include.

### How to contribute

🧬 **As a researcher / potential user** you can provide feedback on the usability of the tool, and suggests way in which it could be made more intuitive.

💻 **As a developer**

* You can suggest a resource (blog post or so) on documentation of APIs built with Flask using swagger, that would be fantastic. Same if you know of resources on how to use this documentation in the frontend to handles responses and requests. You can share the resource in a github issue.
* You can have a look at the organisation of API entry points or frontend components representing sources, and provide feedback on how this is done.
* You can add a new source.

💻+🧬 **As a researcher with some programming knowledge**. At some point, some issues will be labeled with `good first issue`. They will consist of a defined and relatively simple task concerning a small part of the project, so that you can contribute without necessarily understanding the whole application. In any case, if the project excites you, you want to contribute in some way, but you do not see how, please do get in touch through [genestorian@gmail.com](mailto:genestorian@gmail.com) telling something about you, and if you have some ideas for the project.


## Switch from json to SBOL (long term)

To be able to evolve the tool fast, for now I am using json to store all information. However, in the future I would like to switch to [SBOL](https://sbolstandard.org/) to encode all the information.
