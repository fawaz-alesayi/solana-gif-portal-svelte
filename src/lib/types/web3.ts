import type { Wallet as SolanaWallet } from '@project-serum/anchor';

import _IDL, { metadata } from '$lib/idl.json';
import type { TypeDef } from '@project-serum/anchor/src/program/namespace/types';

import type { IdlTypes, Idl } from '@project-serum/anchor';

import type { Contract } from '$lib/types/contract';

export const IDL = _IDL as Idl;

export interface Solana extends SolanaWallet {
	isConnected?: boolean;
	connect(opts?: { onlyIfTrusted: boolean }): Promise<SolanaWallet>;
	disconnect(): Promise<void>;
}

export interface SolanaWindow extends Window {
	solana?: Solana;
}

export type BaseAccount = TypeDef<typeof IDL.accounts[0], IdlTypes<Contract>>;