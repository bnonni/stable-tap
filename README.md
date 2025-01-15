# Stable Tap

A simple On-Chain CLI Wallet for interacting with Taproot Assets (`tapd`) and Lightning Terminal (`litd`).

## Summary

StableTap is a simple CLI wallet that authenticates with an underlying `litd` node exposing the following functionality to users:
1. Mint an asset
2. Generate an asset-specific on-chain address
3. Send an asset on-chain
4. View asset balances
5. Burn an asset
6. Export and validate proofs for an asset
7. Sync with a universe
8. Generate a bitcoin on-chain address
9. Send bitcoin on-chain
10. View bitcoin balances

The goal is to simplify the `tapd` and `litd` UX and offer users a ready-to-use solution for participating with on-chain taproot assets. StableTap aims to set a standard for wallet development prioritizing self-custody, good UX, simplicity, and cross-platform support. This strategy focuses on driving adoption of Taproot Assets, Stablecoins on Taproot Assets and Stable Lightning Channels by creating a wallet that balances privacy, trust, and usability.

## Usage

* Clone this repo
```sh
git clone https://github.com/bnonni/stable-tap.git
```
* Install dependencies
```sh
cd stable-tap
npm install
```
* Open Polar Lightning app and click "Import Network"
* Drag `stable-tap.polar.zip` into Polar and load the network
* Open the `stable-tap` network in Polar and click "Start"
* Build `stable-tap` project code
```sh
npm run build
```
* Run start
```sh
npm start
```

## Notes

* You will see a folder called `app` where I'm extending this into a web application.
* You will see a branch called `browser-extension/chrome` where I'm extending this to a chrome browser extension.
