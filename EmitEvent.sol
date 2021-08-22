// contracts/EmitEvent.sol
pragma solidity >=0.6.0;

contract EmitEvent {

    uint public count = 0;
    event CountIsNow(uint count,uint blockTimestamp, uint blocknumber);

    constructor() {

    }

    function emitEvent() public {
        count = count + 1;
        emit CountIsNow(count, block.timestamp, block.number);
    }

}