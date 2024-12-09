import https from 'https';
import fetch from 'node-fetch';
import config from './config.js';

type TapdClientOptions = { NODE_NAME: string; VERBOSE: boolean };
const tapConfig = config as any;

class TapdClient {
    VERBOSE: boolean = false;

    NODE_NAME: string;
    REST_HOST: string;
    ADMIN_MACAROON: string;
    constructor({ NODE_NAME, VERBOSE }: TapdClientOptions = { NODE_NAME: 'ALICE', VERBOSE: false }) {
        this.VERBOSE = VERBOSE;
        this.NODE_NAME = NODE_NAME;
        const NODE = tapConfig[NODE_NAME];
        this.REST_HOST = NODE.REST_HOST;
        this.ADMIN_MACAROON = NODE.ADMIN_MACAROON;
    }

    async GET(path: string): Promise<any> {
        try {
            const response = await fetch(`${this.REST_HOST}/${path}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Grpc-Metadata-macaroon': this.ADMIN_MACAROON
                },
                agent: new https.Agent({ rejectUnauthorized: false }),
            })
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async POST(path: string, body: any): Promise<any> {
        try {
            const response = await fetch(`${this.REST_HOST}/${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Grpc-Metadata-macaroon': this.ADMIN_MACAROON
                },
                agent: new https.Agent({ rejectUnauthorized: false }),
                body: JSON.stringify(body),
            })
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async getAssets(): Promise<any> {
        const response: { assets: { [key: string]: any } } = await this.GET('assets');
        if (this.VERBOSE) console.log('getAssets response:', response?.assets);
        return response.assets;
    }

    async getAssetsBalance() {
        const response: { asset_balances: { [key: string]: any } } = await this.GET('assets/balance?asset_id=true');
        if (this.VERBOSE) console.log('getAssetsBalance response:', response.asset_balances);
        return response.asset_balances;
    }

    async getAddrs({ asset_id, amt }: { asset_id?: string, amt: number } = { amt: 100 }) {
        asset_id ??= (await this.getAssets())[0].asset_genesis.asset_id;
        const response: any = await this.POST('addrs', { asset_id, amt });
        if (this.VERBOSE) console.log('getAddrs response:', response);
        return response;
    }

    async sendAsset(tap_addrs: string[]) {
        if (!tap_addrs) {
            throw new Error('tap_addrs is required');
        }
        const response: any = await this.POST('send', { tap_addrs });
        if (this.VERBOSE) console.log('sendAsset response:', response);
        return response;
    }
}

export default TapdClient;