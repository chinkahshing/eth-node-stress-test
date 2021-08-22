import { ethers } from 'ethers';
import pkg from 'npmlog';
import {abi} from "./eth/abi.js";
import {address} from "./eth/address.js";
import {config} from "./eth/config.js";
import { appendFileSync, existsSync, renameSync } from 'fs';
import moment from 'moment';

const  { log } = pkg;
Object.defineProperty(pkg, 'heading', { get: () => { return new Date().toUTCString() } })
log.headingStyle = { bg: '', fg: 'white' }

const outputLog = "logEventOut.csv";

const App = () => {

    const myProvider = new ethers.providers.JsonRpcProvider(config.nodeURIHttp);
    const myWallet = new ethers.Wallet(config.privateKey, myProvider);

    const emitEventContract = new ethers.Contract(
        address.EmitEvent,
        abi,
        myProvider
    )

    function initLog() {
        let currentTime = moment(new Date()).format('YYYYMMDDhhmmss')
        if (existsSync(outputLog)) {
            log("info",`initLog","Backing up previous log file... ${outputLog} -> ${outputLog + currentTime}`)
            renameSync(outputLog, outputLog + currentTime, (err) => {
                log("erorr","initLog",err);
            });
        }

        let data = "UTCTime|Count|BlockTimestamp|BlockNumber|EventJSONDump"
        appendFileSync(outputLog, `${data}\r\n`);
        log("info","initLog","New log file created.")
    }

    function listenToEventCountIsNow() {
        log("info","listenToEventCountIsNow","Listening to event...")
        emitEventContract.on("CountIsNow",(count,blockTimestamp,blocknumber, event) => {
            log("info","listenToEventCountIsNow",`${count} ${blockTimestamp} ${blocknumber}`);
            let data = `${new Date().toUTCString()}|${count}|${blockTimestamp}|${blocknumber}|${JSON.stringify(event)}\r\n`
            appendFileSync(outputLog, data);
        })
    }
    initLog();
    listenToEventCountIsNow();
}

App()