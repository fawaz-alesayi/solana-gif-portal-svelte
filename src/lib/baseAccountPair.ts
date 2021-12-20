import { web3 } from "@project-serum/anchor"

const arr = JSON.parse(process.env.PRIVATE_KEY);
const secret = new Uint8Array(arr);
export const baseAccount = web3.Keypair.fromSecretKey(secret);