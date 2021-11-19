import { Connection, PublicKey, clusterApiUrl, Commitment, ConfirmOptions, Cluster, Keypair, SystemProgram} from '@solana/web3.js';
import {
  Program as SolanaProgram, Provider, web3, Wallet as SolanaWallet
} from '@project-serum/anchor';

import idl from './idl.json';
import type { Contract } from './types/contract';
import { BaseAccount, IDL, Solana } from './types/web3';
import { writable } from 'svelte/store';

export interface Program {
	provider?: Provider;
	program?: SolanaProgram<Contract>;
}

export const _programStore = writable<Program>({});

export async function initProgram(
	network: Cluster,
	wallet: SolanaWallet
): Promise<SolanaProgram<Contract>> {
  const rpcEndpoint = clusterApiUrl(network);
	const connection = new Connection(rpcEndpoint, 'processed');
	const provider = new Provider(connection, wallet, { preflightCommitment: 'processed' });
	const programId = new PublicKey(idl.metadata.address);
	const program = new SolanaProgram(IDL, programId, provider) as SolanaProgram<Contract>;

	_programStore.set({
		program,
		provider
	});
	return program;
}


export async function fetchBaseAccount(
	program: SolanaProgram<Contract>,
	baseAccountAddress: PublicKey
): Promise<BaseAccount> {
	console.log(`fetching account from ${baseAccountAddress.toString()}`);
	return await program.account.BaseAccount.fetch(baseAccountAddress);
}

export async function createBaseAccount(
	program: SolanaProgram<Contract>,
	account: Keypair
): Promise<string> {
	return await program.rpc.create({
		accounts: {
			baseAccount: account.publicKey,
			systemProgram: SystemProgram.programId,
			user: program.provider.wallet.publicKey
		},
		signers: [account]
	});
}