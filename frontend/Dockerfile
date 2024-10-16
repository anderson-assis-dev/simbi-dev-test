FROM node:lts-slim
RUN apt-get update && apt-get install --no-install-recommends -y \
    curl \
    vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
ENTRYPOINT ["bash", "/home/node/app/start-dev.sh"]