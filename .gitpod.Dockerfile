FROM gitpod/workspace-full:latest

# pnpm
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Rust
RUN curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh

# Solana
RUN sh -c "$(curl -sSfL https://release.solana.com/v1.8.2/install)"