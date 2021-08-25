# eth-node-stress-test

These are 2 scripts and 1 solidity contract that are used to run event listening stress test on node provider.

## Scripts

1. [emitEvents.js](emitEvents.js) - this will emit the event from the contract [EmitEvent.sol](EmitEvent.sol)
2. [logEvent.js](logEvent.js) - this listens to the event emitted and logs the output to a log file *logEvent.csv*. At startup, if there exists an existing log file, the log will be backup before creating a new one. 

Example logged data
```
UTCTime|Count|BlockTimestamp|BlockNumber|EventJSONDump
Sun, 22 Aug 2021 10:01:35 GMT|23|1629626489|11697801|{...}
Sun, 22 Aug 2021 10:01:48 GMT|24|1629626501|11697805|{...}

```
3. [EmitEvent.sol](EmitEvent.sol) - solidity contract for test. Has a running counter which we can use to determine if any event were skipped. 

## Installation

1. Download and install [node](nodejs.org)
2. Clone this repo
3. Install necessary packages with 

```
npm i
```

or 

```
yarn install
```
4. Configure your http node at [eth/config.js](eth/config.js). To get a new http node, you may signed up an account at ankr, infura, quicknode etc. To run a local geth node, will require further configuration which is not covered in this readme. :)
5. Run logger
```
node logEvent.js
```
6. If you wish to run the emitter, you will need to provide an account private key too. 

```
node emitEvent.js
```

## Currently...

This contract is deployed to bsctestnet under the address *0x0867c877a7905D2c3d041Fc7B5eafB118Ce4172D*. See txn at [BSCTestnet](https://testnet.bscscan.com/address/0x0867c877a7905d2c3d041fc7b5eafb118ce4172d)

The test wallet *0x75722091d68C9Dd69Dc2C74909e29F9B3ad87664* is broadcasting the event at 5 minutes interval. Feel free to fund it with test ETH, BNB etc. 


