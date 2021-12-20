import { Connection, PublicKey, clusterApiUrl, Keypair, SystemProgram } from '@solana/web3.js';
import type { Cluster } from '@solana/web3.js';

import type { Provider } from '@project-serum/anchor';

import * as anchor from '@project-serum/anchor'

import { Program as SolanaProgram} from '@project-serum/anchor';

import idl from './idl.json';
import { IDL } from './types/web3';
import type { Solana } from './types/web3';
import { writable } from 'svelte/store';

import { Buffer } from 'buffer';

if (typeof window != 'undefined') {
	const wa = window as any;
	wa.Buffer = Buffer;
}

// export type SolanaProgram = Program<typeof IDL>;

export interface Program {
	provider?: Provider;
	program?: SolanaProgram;
}

export const _programStore = writable<Program>({});

export async function initProgram(
	network: Cluster,
	wallet: Solana
): Promise<SolanaProgram> {
	const rpcEndpoint = clusterApiUrl(network);
	const connection = new Connection(rpcEndpoint, 'processed');
	const provider = new anchor.Provider(connection, wallet, { preflightCommitment: 'processed' });
	const programId = new PublicKey(idl.metadata.address);
	const program = new SolanaProgram(IDL, programId, provider) as SolanaProgram;

	_programStore.set({
		program,
		provider
	});
	return program;
}


export async function fetchBaseAccount(
	program: SolanaProgram,
	baseAccountAddress: PublicKey
) {
	console.log(`fetching account from ${baseAccountAddress.toString()}`);
	return await program.account.baseAccount.fetch(baseAccountAddress);
}

export async function createBaseAccount(
	program: SolanaProgram,
	baseAccount: Keypair
) {
	return await program.rpc.create({
		accounts: {
			baseAccount: baseAccount.publicKey,
			user: program.provider.wallet.publicKey,
			systemProgram: SystemProgram.programId,
		},
		signers: [baseAccount]
	});
}