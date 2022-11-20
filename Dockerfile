FROM alpine:3.16.3

RUN apk add --no-cache git \
    ca-certificates \
    openjdk11 \
    zsh \
    curl \
    wget \
    nodejs \
    neovim \
    npm \
    procps

RUN npm i -g npx yarn @nestjs/cli@8.2.5 npm@8.15.0

RUN adduser -D -u 1000 -s /bin/zsh -G root -h /home/node node && \
    echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER node

WORKDIR /home/node/app

RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)" -- \
    -t https://github.com/romkatv/powerlevel10k \
    -p git \
    -p git-flow \
    -p https://github.com/zdharma-continuum/fast-syntax-highlighting \
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions \
    -a 'export TERM=xterm-256color'

RUN echo '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' >> ~/.zshrc && \
    echo 'HISTFILE=/home/node/zsh/.zsh_history' >> ~/.zshrc

CMD [ "tail", "-f", "/dev/null" ]
