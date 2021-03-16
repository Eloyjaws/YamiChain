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
        address agentAddress;
    }

    event NewAgentCreated(
        address indexed _agentAddress,
        uint256 indexed _providerId,
        string _agentName,
        uint256 indexed _idNumber
    );

    Agent[] public agents;
    mapping(uint256 => uint256) employeeToProvider;
    mapping(uint256 => address) employeeToAddress;

    modifier onlyManagerOf(uint256 _providerId) {
        require(providerToOwner[_providerId] == msg.sender);
        _;
    }

    function addAgent(
        uint256 _providerId,
        string memory _agentName,
        uint32 _idNumber,
        address _agentAddress
    ) public onlyManagerOf(_providerId) {
        agents.push(Agent(_agentName, _idNumber, _agentAddress));
        uint256 id = agents.length - 1;
        // This links the agent to the provider.
        employeeToProvider[id] = _providerId;
        employeeToAddress[id] = _agentAddress;
        emit NewAgentCreated(_agentAddress, _providerId, _agentName, _idNumber);
    }

    function getAgentsByProvider(uint256 _providerId)
        external
        view
        returns (Agent[] memory)
    {
        Agent[] memory results =
            new Agent[](providers[_providerId].maxNumberOfEmployees);
        uint256 j = 0;
        for (uint256 i = 0; i < agents.length && j < results.length - 1; i++) {
            if (employeeToProvider[i] == _providerId) {
                results[j] = agents[i];
                j++;
            }
        }
        return results;
    }

    function getAgentIndex(address _sender) internal view returns (uint256) {
        for (uint256 i = 0; i < agents.length; i++) {
            if (employeeToAddress[i] == _sender) return i + 1;
        }
        return 0;
    }
}
