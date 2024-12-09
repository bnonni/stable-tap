import fs from 'fs';
import https from 'https';
import fetch from 'node-fetch';
import config from './config.js';

type TapdClientOptions = { NODE_NAME: string; VERBOSE: boolean };
const tapConfig = config as any;

class TapdClient {
    VERBOSE: boolean = false;

    NODE_NAME: string;
    REST_HOST: string;
    MACAROON_PATH: string;
    REQUEST_OPTIONS: any = {
        headers: { 'Content-Type': 'application/json' },
        agent: new https.Agent({ rejectUnauthorized: false })
    }
    constructor({ NODE_NAME, VERBOSE }: TapdClientOptions = { NODE_NAME: 'ALICE', VERBOSE: false }) {
        this.VERBOSE = VERBOSE;
        this.NODE_NAME = NODE_NAME;
        const NODE = tapConfig[NODE_NAME];
        this.REST_HOST = NODE.REST_HOST;
        this.MACAROON_PATH = NODE.MACAROON_PATH
        this.REQUEST_OPTIONS.headers!['Grpc-Metadata-macaroon'] = fs.readFileSync(this.MACAROON_PATH).toString('hex');
    }

    async GET(path: string): Promise<any> {
        try {
            this.REQUEST_OPTIONS.method = 'GET';
            const response = await fetch(`${this.REST_HOST}/${path}`, this.REQUEST_OPTIONS)
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }


    async POST(path: string, body: any): Promise<any> {
        try {
            this.REQUEST_OPTIONS.method = 'POST';
            this.REQUEST_OPTIONS.body = JSON.stringify(body);
            const response = await fetch(`${this.REST_HOST}/${path}`, this.REQUEST_OPTIONS)
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async getAssets(): Promise<any> {
        const response: { assets: { [key: string]: any } } = await this.GET('assets');
        if (this.VERBOSE) console.log('getAssets response:', response.assets);
        return response.assets;
    }

    async getAssetsBalance() {
        const response: { asset_balances: { [key: string]: any } } = await this.GET('assets/balance?asset_id=true');
        if (this.VERBOSE) console.log('getAssetsBalance response:', response.asset_balances);
        return response.asset_balances;
    }

    async getAddrs(asset_id?: string) {
        asset_id ??= (await this.getAssets())[0].asset_genesis.asset_id;
        const response: any = await this.POST('addrs', { asset_id, amt: 100 });
        if (this.VERBOSE) console.log('getAddrs response:', response);
        return response;
    }

    async sendAsset(tap_addrs: string) {
        if (!tap_addrs) {
            throw new Error('tap_addrs is required');
        }
        const response: any = await this.POST('assets/send', { tap_addrs });
        if (this.VERBOSE) console.log('sendAsset response:', response);
        return response;
    }
}

const alice = new TapdClient({ NODE_NAME: 'ALICE', VERBOSE: true });
const bob = new TapdClient({ NODE_NAME: 'BOB', VERBOSE: true });

const assetId = (await alice.getAssets())[0].asset_genesis.asset_id;
console.log(`Alice's USD-L Asset ID: ${assetId}`);

const { [assetId]: { balance: aliceBalance } } = await alice.getAssetsBalance();
console.log(`Alice's USD-L Asset Balance: ${aliceBalance}`);

const { encoded } = await bob.getAddrs(assetId);
console.log(`Bob's USD-L Asset Receiving Addr: ${encoded}`);

const transfer = await alice.sendAsset(encoded);
console.log(`Alice's USD-L Asset Transfer to Bob: `, transfer);

const { [assetId]: { balance: bobBalance } } = await bob.getAssetsBalance();
console.log(`Bob's USD-L Asset Balance: ${bobBalance}`);