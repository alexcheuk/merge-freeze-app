FROM node:alpine as builder

RUN apk update && apk add ca-certificates

WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
COPY . .

RUN wget https://releases.hashicorp.com/envconsul/0.9.0/envconsul_0.9.0_linux_amd64.zip&&unzip envconsul_0.9.0_linux_amd64.zip -d /usr/local/bin
    # install vault
RUN  wget https://releases.hashicorp.com/vault/1.1.2/vault_1.1.2_linux_amd64.zip &&unzip vault_1.1.2_linux_amd64.zip -d /usr/local/bin
RUN chmod +x entrypoint.sh

EXPOSE 80
