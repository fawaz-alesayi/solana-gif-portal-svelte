import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { SystemProgram } from '@solana/web3.js';
import { expect } from 'chai';
import { Contract } from '../target/types/contract';

let provider: anchor.Provider;
let program: Program<Contract>;
let baseAccount: anchor.web3.Keypair;
let tx;

describe('contract', () => {

  beforeEach(async () => {
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

    const tx = await program.rpc.addGif("https://tenor.com/view/roblox-cute-puppy-doing-cute-things-gif-21268789", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      }
    })

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    expect(account.totalGifs.toString()).to.be.string('1', 'totalGifs has not been incremented.');

  })

  it('should retrieve the gif after it has been posted', async () => {
    const addedGif = "https://tenor.com/view/roblox-cute-puppy-doing-cute-things-gif-21268789"
    const tx = await program.rpc.addGif(addedGif, {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      }
    })

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    expect(account.gifList).to.be.an('array');
    expect(account.gifList[0]).to.have.property('gifLink');
    const gifLink: string = account.gifList[0].gifLink;
    console.log('👀 GIF List', account.gifList)
    expect(gifLink).equal(addedGif);
  })


});
