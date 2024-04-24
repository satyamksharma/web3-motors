// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

/**
 * @custom:oz-upgrades-unsafe-allow constructor
 * @custom:dev-run-script deploy
 */
contract Contract {
    mapping(address => uint) public contributors;
    address public manager;
    uint public minimumContribution;
    uint public raisedAmount;
    uint public noOfContributors;
    
    struct Request{
        uint uniqueid;
        string description;
        address payable recipient;
        uint target;
        bool completed;
        uint noOfVoters;
        address[] voter;
    }
    
    receive() external payable {}
    
    mapping(uint => Request) public requests;
    uint public numRequests;
    
    constructor() {
        minimumContribution = 100 wei;
        manager = msg.sender;
    }
    
    function sendEth() public payable {
        require(msg.value >= minimumContribution, "Minimum Contribution is not met");
        
        if(contributors[msg.sender] == 0){
            noOfContributors++;
        }
        
        contributors[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }
    
    function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }
    
    function createRequests(string memory _description, address payable _recipient, uint _target) public {
        require(msg.sender == manager, "Only manager can call this function");
        Request storage newRequest = requests[numRequests];
        newRequest.uniqueid = numRequests;
        newRequest.description = _description;
        newRequest.recipient = payable(_recipient);
        newRequest.target = _target;
        newRequest.completed = true;
        newRequest.noOfVoters = 0;
        numRequests++;
    }
    
        require(contributors[msg.sender] > 0, "You must be a contributor");
        Request storage thisRequest = requests[_requestNo];
        address[] memory arry = thisRequest.voters;
        
        for (uint i = 0; i < arry.length; i++) {
            require(arry[i] != msg.sender, "You already Voted");
        }
        
        thisRequest.noOfVoters += 1;
        thisRequest.voters.push(msg.sender);
    }
    
    function makePayment(uint _requestNo) public {
        require(msg.sender == manager, "Only manager can call this function");
        Request storage thisRequest = requests[_requestNo];
        require(raisedAmount >= thisRequest.target);
        require(!thisRequest.completed, "The request has been completed");
        require(thisRequest.noOfVoters > noOfContributors / 2, "Majority does not support");
        thisRequest.recipient.transfer(thisRequest.target);
        
    }
}
