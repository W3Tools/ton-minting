import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { OpenedContract, WalletContractV3R2 } from 'ton';
import { KeyPair, mnemonicToWalletKey } from 'ton-crypto';
import { TonClient, TonClientParameters } from 'ton/dist/client/TonClient';

export class TonCenter {
    uri: string;
    ton: TonClient;
    wallet: WalletContractV3R2;
    keyPair: KeyPair;
    constructor() {
        this.ton = this.getClient();
        this.uri = 'https://testnet.tonscan.org/address';
    }

    static sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    private getClient() {
        let apiKey = process.env.RPC_API_KEY;
        if (!apiKey) throw Error('Please Provide API Key For RPC');
        let param: TonClientParameters = {
            endpoint: process.env.RPC_ENDPOINT ? process.env.RPC_ENDPOINT : 'https://testnet.toncenter.com/api/v2/jsonRPC',
            apiKey: apiKey,
        };
        return new TonClient(param);
    }

    // Waiting for transaction to be packaged
    async awaitTransaction(contract: OpenedContract<WalletContractV3R2>, seqno: number) {
        console.log('waiting for deploy transaction to confirm...');
        let currentSeqno = seqno;
        while (currentSeqno == seqno) {
            await TonCenter.sleep(1500);
            currentSeqno = await contract.getSeqno();
        }
    }

    // get wallet infomation via mnemonic
    async getWallet(mnemonic?: string[]) {
        if (!mnemonic) {
            const mnemonicEnv = process.env.MNEMONIC;
            if (!mnemonicEnv) throw Error('Please Provide Mnemonic');
            mnemonic = mnemonicEnv.split(' ');
        }

        this.keyPair = await mnemonicToWalletKey(mnemonic);
        this.wallet = WalletContractV3R2.create({ publicKey: this.keyPair.publicKey, workchain: 0 });

        // check the wallet is Active
        const isDeployed = await this.ton.isContractDeployed(this.wallet.address);
        if (!isDeployed) throw Error(`Wallet ${this.wallet.address.toString()} Not Found!`);
        console.log(`Wallet address: ${this.uri}/${this.wallet.address.toString()}`);
    }
}
