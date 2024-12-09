import TapdClient from "../tapd-client.js";

document.getElementById('send')?.addEventListener('click', () => {
    location.href = 'public/send.html';
});

document.getElementById('receive')?.addEventListener('click', () => {
    location.href = 'public/receive.html';
});

document.getElementById('back')?.addEventListener('click', () => {
    location.href = 'public/index.html';
});

document.addEventListener('DOMContentLoaded', async () => {
    const alice = new TapdClient({ NODE_NAME: 'ALICE', VERBOSE: true });
    const assetId = (await alice.getAssets())[0].asset_genesis.asset_id;
    const balanceElement = document.getElementById('balance')!;
    console.log(`Alice's USD-L Asset ID: ${assetId}`);
    const { [assetId]: { balance: aliceBalance } } = await alice.getAssetsBalance();
    console.log(`Alice's USD-L Asset Balance: ${aliceBalance}`);
    balanceElement.innerText = aliceBalance;
});