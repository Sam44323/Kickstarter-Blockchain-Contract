pragma solidity ^0.4.17;

// creating a contract factory for creating deploying a contract

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minimumAmount) public {
        deployedCampaigns.push(new Campaign(minimumAmount, msg.sender)); // pushing the address of the deployed campaign
    }

    function getDeployedCampaigns() public view return(address[]){
        return deployedCampaigns;
    }

}

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
    uint256 public approversCount;

    constructor(uint256 minvValue, address managerAddress) public {
        manager = managerAddress;
        minContributionAmount = minvValue;
    }

    // function for adding a contributor

    function contribute() public payable {
        require(msg.value > minContributionAmount);
        approvers[msg.sender] = true;
        approversCount++;
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

    // function for approving a request (takes the index in params for which the function should run)
    function approveRequest(uint256 requestIndex) public {
        Request storage request = requests[requestIndex];

        require(approvers[msg.sender]); // checking if the person is a donator
        require(!request.approvals[msg.sender]); // checking if the person has not voted for this request before

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 requestIndex) public restricted {
        Request storage request = requests[requestIndex];
        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));

        request.recipient.transfer(request.value); // transferring the the request money to the recipient
        request.complete = true;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
