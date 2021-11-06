export const checkIfPhantomWalletExists = async (): Promise<Record<string, unknown>> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { solana } = window as any;

      if (solana) {
        if (solana.isPhantom) {
          return Promise.resolve(solana);
        }
      } else {
        return Promise.reject("Wallet found is not Phantom Wallet.")
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const connectWallet = async (solana, trusted: boolean): Promise<string> => {
    try {
        // Only connect the wallet if the user has connected before.
        const response = await solana.connect({ onlyIfTrusted: trusted });
        return response.publicKey.toString();
    } catch (error) {
        return Promise.reject(error);
    }
}