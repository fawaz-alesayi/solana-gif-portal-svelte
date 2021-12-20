FROM gitpod/workspace-full:latest

# pnpm
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Solana
RUN sh -c "$(curl -sSfL https://release.solana.com/v1.8.2/install)"

# Anchor Dependencies
USER gitpod
RUN pnpm add -g @project-serum/anchor-cli@0.19.1-beta.1