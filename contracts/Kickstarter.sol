pragma solidity ^0.4.17;

contract Campaign {
    // struct for storing a request
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

    // function for creating a new request

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
                complete: false,
                approvalCount: 0
            })
        );
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    // function for approving a request (takes the index in params for which the function should run)
    function approveRequest(uint256 requestIndex) public {
        Request storage request = requests[requestIndex];

        require(approvers[msg.sender]); // checking if the person is a donator
        require(!request.approvals[msg.sender]); // checking if the person has not voted for this request before

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
}
