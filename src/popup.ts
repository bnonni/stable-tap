import TapdClient from "./index.js";

const balanceElement = document.getElementById('balance')!;
const sendButton = document.getElementById('send')!;
const receiveButton = document.getElementById('receive')!;


const bob = new TapdClient({ NODE_NAME: 'BOB', VERBOSE: true });
const alice = new TapdClient({ NODE_NAME: 'ALICE', VERBOSE: true });
const assetId = (await alice.getAssets())[0].asset_genesis.asset_id;

const getAliceBalance = async () => {
    console.log(`Alice's USD-L Asset ID: ${assetId}`);
    const { [assetId]: { balance: aliceBalance } } = await alice.getAssetsBalance();
    console.log(`Alice's USD-L Asset Balance: ${aliceBalance}`);
    balanceElement.innerText = aliceBalance;
}

const sendAsset = async () => {
    const { encoded } = await bob.getAddrs(assetId);
    console.log(`Bob's USD-L Asset Receiving Addr: ${encoded}`);
    const transfer = await alice.sendAsset(encoded);
    console.log(`Alice's USD-L Asset Transfer to Bob: `, transfer);
}
// const { [assetId]: { balance: bobBalance } } = await bob.getAssetsBalance();
// console.log(`Bob's USD-L Asset Balance: ${bobBalance}`);

await getAliceBalance();