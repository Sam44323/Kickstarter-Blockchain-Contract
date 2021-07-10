pragma solidity ^0.4.17;

contract Campaign {
    // struct for a request
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
    }

    /**
        manager: storing the address of the fund requester
        minContributionAmount: storing the min contribution amount set by the manager
        approvers: storing the array of the approvers/contributors for the project
        request: storing the array of requests initiated by the manager
     */

    address public manager;
    uint256 public minContributionAmount;
    address[] public approvers;
    Request[] public requests;

    constructor(uint256 minvValue) public {
        manager = msg.sender;
        minContributionAmount = minvValue;
    }

    // function for adding a contributor

    function contribute() public payable {
        require(msg.value > minContributionAmount);
        approvers.push(msg.sender);
    }

    // function for creating a new request by the manager

    function createRequest(
        string description,
        uint256 value,
        address recipient
    ) public restricted {
        // creating a new Request instance variable that stores the pointer
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false
        });

        requests.push(newRequest);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
