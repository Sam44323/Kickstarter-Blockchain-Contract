pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
    }

    address public manager;
    uint256 public minContributionAmount;
    address[] public approvers;
    Request[] public requests;

    constructor(uint256 minvValue) public {
        manager = msg.sender;
        minContributionAmount = minvValue;
    }

    function contribute() public payable {
        require(msg.value > minContributionAmount);
        approvers.push(msg.sender);
    }
}
