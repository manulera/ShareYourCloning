# Useful resources prior to getting started

A good starting project can be a small website that does the following:

It has a single page that contains a form where the user can enter a NCBI identifier (e.g. NM_001018957.2), click a button, and download the file contained in the NCBI record in genbank format, like the one in the text file in the link below:

https://www.ncbi.nlm.nih.gov/nuccore/NM_001018957.2

## What the website should look like

* The frontend should be a single `index.html` file with a form that sends a request to the backend using javascript's function `fetch`. The payload of the request will contain the NCBI identifier.
* The backend is built using [FastAPI](https://fastapi.tiangolo.com/) and have an entrypoint that:
  * Receives the request from the frontend containing the NCBI identifier.
  * Makes a request to NCBI using the python library `requests`. You can get NCBI entries more easily using the library `BioPython`, but it's good practice to process the response from NCBI and turn it into a file yourself.
  * Sends the file to frontend, where the user can then download it.

## Useful youtube channels and resources

ChatGPT is your friend. Take some time to describe your question well and it will probably give you a good answer. Otherwise good old google, and you will find that almost all of your questions have been solved by someone in [StackOverflow](https://stackoverflow.com/).

Some youtube channels:

https://www.youtube.com/@TraversyMedia

Great for the basics. Short videos to the point.

https://www.youtube.com/@freecodecamp

A lot of variance between instructors, but there are some very good videos.

https://www.youtube.com/@academind

An alternative channel, can be good for frontend videos. In general they spend a bit more time on explaining why things are the way there are.

## Things to learn

### Use VSCode as an editor

Here is a video on how to set up for python. When you get it working, we can have a look at it together to make sure you are getting the most help possible from the code editor.

https://www.youtube.com/watch?v=W--_EOzdTHk&ab_channel=TraversyMedia

You should also install this extension. You will have to provide some info to use it for free as a student, but it's worth the effort:

https://github.com/features/copilot

### Git and GitHub

You should store your project on GitHub as soon as you can, to track the versions and get used to git and github.

This playlist from Academind looked good, I have not followed the course myself, but I am sure it's good to get you started.

https://www.youtube.com/watch?v=_OZVJpLHUaI&list=PL55RiY5tL51poFMpbva1IqfO-pylwSNsN&index=1&ab_channel=Academind

This is some more advanced GitHub stuff for when you work with others. The video is from a mentorship program I attended a while ago and I found it to be quite to the point, but covering the most important things. It has a great introduction to [Markdown](https://www.markdownguide.org/getting-started/), the very simple markup language to write documents like this one.

https://www.youtube.com/watch?v=lRW8mlpTw5M&ab_channel=OpenLifeSci

### Markdown

As mentioned above, easy and important skill for Open Source development. VScode has good extensions to work with it.

### Python

Go through the basics again, I recommend the online tutorials here:

https://www.learnpython.org/

### HTML / CSS / JavaScript

HTML and CSS first, any of the recent beginner videos from this playlist would be good:

https://www.youtube.com/watch?v=UB1O30fR-EE&list=PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU&ab_channel=TraversyMedia

Then for javascript they have this list (the first one looks good):

https://www.youtube.com/watch?v=hdI2bqOjy3c&list=PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX&ab_channel=TraversyMedia

Very important to understand "asynchronous javascript" (promises, await, etc.). It can be a bit hard to understand in the begining. If you get stuck, you might want to go with python a bit more and then come back to it.

A good short project that covers all HTML/CSS/JS is this one
https://www.youtube.com/watch?v=P7t13SGytRk&list=PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU&index=7&ab_channel=TraversyMedia

### Dependency managers in python

This might be a bit advanced for the first steps, so probably you will be installing the python libraries you will using `pip install x`. However, once a project gets big and others will use your code, it becomes very important to use dependency managers. The one I use is called [poetry](https://python-poetry.org/). You can find several tutorials in youtube.

> NOTE: If you are going to be using a python environment inside your proejct, remember to add the environment folder to the `.gitignore` file (you will understand what this means eventually)

### Writing a backend API using python

The framework I use in the project is [FastAPI](https://fastapi.tiangolo.com/). It makes API development much easier. Here is a video that looked like it covered all important aspects, but feel free to use another one!

https://www.youtube.com/watch?v=GN6ICac3OXY&ab_channel=Amigoscode

The request to NCBI to get the genbank file can be a bit tricky to figure out, but check this guide "Examples" section:

https://www.ncbi.nlm.nih.gov/books/NBK25499/#chapter4.EFetch
