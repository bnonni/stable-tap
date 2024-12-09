# Stable Tap

A simple browser extension for receiving stablecoin taproot assets

## Summary

StableTap is a browser extension that simplifies the use of stablecoins deployed to Bitcoin via Taproot Assets. It offers businesses a ready-to-use solution for participating in the stablecoin ecosystem or serves as a template for building proprietary wallets. StableTap aims to set a standard for wallet development prioritizing self-custody, good UX, simplicity, and cross-platform support. This strategy focuses on driving adoption of Taproot Assets and Stable Lightning Channels by creating a wallet that balances privacy, trust, and usability.

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

* You will see a folder called "app" where I attempted to make this a web application, but I ran out of time.
* You will see a branch called `browser-extension/chrome` where I attempted to package this into a browser extension, but I ran out of time.
* A future iteration would be a fully functional cross-browser extension wallet app per the GTM strategy.
