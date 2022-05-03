FROM ghcr.io/amgeo-collaboration/amgeo-earthcube-workshop-2022:latest

RUN pip install svgpath2mpl wasabi==0.2.1 black==19.10b0

### create user with a home directory
ARG NB_USER=jovyan
ARG NB_UID=1000
ENV USER ${NB_USER}
ENV NB_UID ${NB_UID}
ENV HOME /home/${NB_USER}

RUN adduser --disabled-password \
    --gecos "Default user" \
    --uid ${NB_UID} \
    ${NB_USER}

# prepare data
WORKDIR ${HOME}

# dummmy credentials file
#COPY amgeo_user.json .local/share/AMGeO/amgeo_user.json

# give user permissions to files in HOME
USER root
RUN chown -R ${NB_UID} ${HOME}
USER ${NB_USER}