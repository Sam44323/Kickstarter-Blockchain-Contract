pragma solidity ^0.4.17;

contract Campaign {
    // struct for a request
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    /**
        manager: storing the address of the fund requester
        minContributionAmount: storing the min contribution amount set by the manager
        approvers: storing a map of the approvers/contributors for the project
        request: storing the array of requests initiated by the manager
     */

    address public manager;
    uint256 public minContributionAmount;
    mapping(address => bool) public approvers;
    Request[] public requests;

    constructor(uint256 minvValue) public {
        manager = msg.sender;
        minContributionAmount = minvValue;
    }

    // function for adding a contributor

    function contribute() public payable {
        require(msg.value > minContributionAmount);
        approvers[msg.sender] = true;
    }

    // function for creating a new request by the manager

    function createRequest(
        string description,
        uint256 value,
        address recipient
    ) public restricted {
        requests.push(
            Request({
                description: description,
                value: value,
                recipient: recipient,
                complete: false
            })
        );
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
