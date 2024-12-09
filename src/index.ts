import readline from 'readline';
import TapdClient from "./tapd-client.js";

const bob = new TapdClient({ NODE_NAME: 'BOB', VERBOSE: false });
const alice = new TapdClient({ NODE_NAME: 'ALICE', VERBOSE: false });

const asset_id = (await alice.getAssets())[0].asset_genesis.asset_id;
console.log(`Alice's USD-L Asset ID: ${asset_id}`);

const { [asset_id]: { balance: aliceBalance } } = await alice.getAssetsBalance();
console.log(`Alice's USD-L Asset Balance: ${aliceBalance}`);

const { encoded: tap_addrs } = await bob.getAddrs({ asset_id, amt: 100 });
console.log(`Bob's USD-L Asset Receiving Addr: ${tap_addrs}`);

const { transfer: { transfer_timestamp, anchor_tx_hash } } = await alice.sendAsset([tap_addrs]);
console.log(`Alice's USD-L Asset Transfer to Bob: `, { transfer_timestamp, anchor_tx_hash });

async function waitForQuicMineEnter(): Promise<void> {
    console.log('Click Quick Mine on your Polar UI and press Enter to continue ...');
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question("Press Enter to continue...\n", () => {
            rl.close();
            resolve();
        });
    });
}

await waitForQuicMineEnter();

const { [asset_id]: { balance: bobBalance } } = await bob.getAssetsBalance();
console.log(`Bob's USD-L Asset Balance: ${bobBalance}`);