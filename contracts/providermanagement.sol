// SPDX-License-Identifier: Unlicensed
pragma solidity >=0.6.0 <0.8.0;
pragma abicoder v2;

import "./providercreation.sol";

contract ProviderManagement is ProviderCreation {
    // Maintain a list of all the employees
    // Then we have a mapping from provider to employees

    struct Agent {
        string name;
        uint32 idNumber;
    }

    event NewAgentCreated(address indexed _agentAddress, uint indexed _providerId, string _agentName);

    Agent [] public agents;
    mapping (uint => uint) employeeToProvider;
    mapping (uint => address) employeeToAddress;

    modifier onlyManagerOf(uint _providerId){
        require(providerToOwner[_providerId] == msg.sender);
        _;
    }

    function addAgent(uint _providerId, string memory _agentName, uint32 _idNumber, address _agentAddress) public onlyManagerOf(_providerId) {
        agents.push(Agent(_agentName, _idNumber));
        uint id = agents.length - 1;
        // This links the agent to the provider.
        employeeToProvider[id] = _providerId;
        employeeToAddress[id] = _agentAddress;
        emit NewAgentCreated(_agentAddress, _providerId, _agentName);
    }

    function getAgentsByProvider(uint _providerId) external view returns (Agent [] memory){
        Agent [] memory results = new Agent [] (providers[_providerId].maxNumberOfEmployees);
        uint j = 0;
        for (uint i = 0; i < agents.length && j < results.length - 1; i++) {
            if (employeeToProvider[i] == _providerId) {
                results[j] = agents[i];
                j++;
            }
        }
        return results;
    }
    
    function getAgentIndex(address _sender) internal view returns (uint) {
        for (uint i = 0; i < agents.length; i++) {
            if(employeeToAddress[i] == _sender)
                return i + 1;
        }
        return 0;
    }
}