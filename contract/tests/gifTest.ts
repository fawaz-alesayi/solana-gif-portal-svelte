import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { SystemProgram } from '@solana/web3.js';
import { expect } from 'chai';
import { Contract } from '../target/types/contract';

let provider: anchor.Provider;
let program: Program<Contract>;
let baseAccount: anchor.web3.Keypair;
let tx;

describe('contract', async () => {

  before(async () => {
    // Configure the client to use the local cluster.
    provider = anchor.Provider.env();
    anchor.setProvider(provider);

    program = anchor.workspace.Contract;

    // Create an account keypair for our program to use.
    baseAccount = anchor.web3.Keypair.generate();

    tx = await program.rpc.create({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });
  })

  it('can be created!', async () => {
    console.log("📝 Your transaction signature is ", tx);
    expect(tx).to.be.a('string');
  });

  it('should have 0 gifs', async () => {
    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('number of gifs: ', account.totalGifs.toString());
    expect(account.totalGifs.toString()).to.be.string('0', 'totalGifs are not zero!');
  })

  it('should increment a gif by one', async () => {

    const tx = await program.rpc.addGif({
      accounts: {
        baseAccount: baseAccount.publicKey,
      }
    })

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);

    console.log("📝 Your transaction signature is ", tx);
    expect(account.totalGifs.toString()).to.be.string('1', 'totalGifs has not been incremented.');

  })
});
