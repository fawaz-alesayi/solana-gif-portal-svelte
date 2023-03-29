# Archive Note

I abandoned all things related to web3.

# buildspace Solana GIF Portal Project
*Note: This is a bit different from the original project since it was made with Svelte and XState!*
*I choose Svelte because It's easier to read. XState was choosen to prevent and catch any unexpected state bugs.*

### **Welcome 👋**
To get started with this project, clone this repo and follow these commands:

### Prerequisites
- Make sure you have [pnpm](https://pnpm.io/installation) installed

1. Run `pnpm install` at the root of your directory
2. Run `pnpm start` to start the project
3. Start coding!

### **Questions?**
Have some questions make sure you head over to your [buildspace Dashboard](https://app.buildspace.so/courses/CObd6d35ce-3394-4bd8-977e-cbee82ae07a3) and link your Discord account so you can get access to helpful channels and your instructor!


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

### Exporting your Solana Private Keys
This Svelte app reads your private key from an environment variable. To export your key as an environment variables:
1. Create a new keypair using `solana-keygen new` or recover a previous keypair by `solana-keygen recover`
2. On Linux, you will find the private key in `~/.config/solana.id.json`. Copy all contents of that file and export it using `export PRIVATE_KEY=<Whatever you copied>`

### Developing with Gitpod!
If you're having trouble getting anything to work just use Gitpod! Gitpod is essentialy a Linux machine with VSCode on the cloud. This repository is configured with a Gitpod environment that includes node and pnpm!

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/fawaz-alesayi/solana-gif-portal-svelte)

## Building

Before creating a production version of this app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
pnpm build
```

IF you ran `pnpm install` you already have a static adapter that builds a static version of the application (CSS, HTML, JS)!

> You can preview the built app with `pnpm preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
