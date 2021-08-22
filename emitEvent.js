import { ethers } from 'ethers';
import pkg from 'npmlog';
import {abi} from "./eth/abi.js";
import {address} from "./eth/address.js";
import {config} from "./eth/config.js";

const  { log } = pkg;
Object.defineProperty(pkg, 'heading', { get: () => { return new Date().toUTCString() } })
log.headingStyle = { bg: '', fg: 'white' }

const interval = 5 * 60 * 1000;

const App = () => {

    let processing = false;

    const myProvider = new ethers.providers.JsonRpcProvider(config.nodeURIHttp);
    const myWallet = new ethers.Wallet(config.privateKey, myProvider);

    const emitEventContract = new ethers.Contract(
        address.EmitEvent,
        abi,
        myProvider
    )
    let signedEmitEventContract = emitEventContract.connect(myWallet);

    async function emitEvent() {
        if (processing) { return }
        processing = true;
        await signedEmitEventContract.emitEvent().then((res) => {
            processing = false;
            log("info", "emitEvent", `nonce: ${res.nonce} / txnHash: ${res.hash}`);
        })
    }

    function main() {
        setInterval(()=> {
            emitEvent()
        }, [interval])
    }
    log("info",`emitEvent","Emitting event at ${interval}ms interval`)
    main();
}

App();