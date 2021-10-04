# start from base
FROM ubuntu:18.04
LABEL maintainer="Manuel Lera Ramirez <manulera14@gmail.com>"

# Settings

# This is for the python install not to ask your geographic area
# when installing tzdata.
# Change Europe/Paris for your timezone: the list is here https://en.wikipedia.org/wiki/List_of_tz_database_time_zones 
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Paris

# Install py39 from deadsnakes repository
RUN apt-get update -y
RUN apt install software-properties-common -y
RUN add-apt-repository ppa:deadsnakes/ppa -y
RUN apt-get update -y
RUN apt-get install python3.9 -y
# Required for pipenv
RUN apt-get install python3.9-distutils -y

# Install pip (python package downloader)
RUN apt-get install python3-pip -y

# Install pipenv (package manager)
RUN pip3 install pipenv

# Install git to download the source code
RUN apt install git -y

# Install yarn
RUN apt-get install yarn -y

# Move to the app directory
WORKDIR /app

RUN git clone https://github.com/manulera/ShareYourCloning

# For pipenv to work
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8



