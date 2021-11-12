FROM gitpod/workspace-full:latest

# pnpm
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Solana
RUN sh -c "$(curl -sSfL https://release.solana.com/v1.8.2/install)"

# Anchor and its dependencies
USER gitpod
ENV PATH="$HOME/.cargo/bin:$PATH"
RUN sudo apt update && sudo apt install -y pkg-config build-essential libudev-dev
RUN cargo install --git https://github.com/project-serum/anchor --tag v0.18.0 anchor-cli --locked