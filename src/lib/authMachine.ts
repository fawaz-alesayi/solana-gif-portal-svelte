import { createModel } from 'xstate/lib/model.js'
import { assign } from 'xstate';
import { checkIfPhantomWalletExists, connectWallet } from './checkWalletConnection';

const walletModel = createModel({
	solana: {} as Record<any, any>,
	wallet: '' as string,
	error: '' as string,
	events: {
		CHECK_WALLET_EXISTENCE: () => ({}),
        CONNECT_WALLET: () => ({}),
	}
});

export const walletMachine = walletModel.createMachine(
	{
		context: walletModel.initialContext,
		initial: 'idle',
		states: {
			idle: {
				on: {
					CHECK_WALLET_EXISTENCE: {
						target: 'checkingWalletExistence'
					}
				}
			},
			checkingWalletExistence: {
				invoke: {
					src: () => checkIfPhantomWalletExists(),
					onDone: {
						target: 'walletExists',
						actions: assign({
							solana: (_, event) => event.data
						})
					},
					onError: {
						target: 'walletDoesNotExist'
					}
				}
			},
			walletExists: {
                // Try to connect to the wallet if the user has already connected before. This is called "trusted mode"
				invoke: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					src: (context, _) => connectWallet(context.solana, true),
					onDone: {
						target: 'walletConnected',
						actions: assign({
                            wallet: (_, event) => event.data
                        })
					},
                    onError: {
                        target: 'walletConnectionFailed',
                        actions: assign({
                            error: (_, event) => event.data
                        }),
                    }
				},
                on: {
                    CONNECT_WALLET: {
                        target: 'connectingWallet'
                    }
                }
			},
            connectingWallet: {
                invoke: {
					src: (context, _) => connectWallet(context.solana, false),
					onDone: {
						target: 'walletConnected',
						actions: assign({
                            wallet: (_, event) => event.data
                        })
					},
                    onError: {
                        target: 'walletConnectionFailed',
                        actions: assign({
                            error: (_, event) => event.data
                        }),
                    }
				}
            },
			walletConnected: {},
            walletConnectionFailed: {
                on: {
                    CONNECT_WALLET: {
                        target: 'connectingWallet'
                    }
                }
            },
			walletDoesNotExist: {},
		}
	},
	{}
);
