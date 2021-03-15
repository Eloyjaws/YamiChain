// SPDX-License-Identifier: Unlicensed
pragma solidity >=0.6.0 <0.8.0;
pragma abicoder v2;

import "./providermanagement.sol";

contract CustomerManagement is ProviderManagement{
    struct Customer {
        string name;
        string idNumber;
        uint256 loansCount;
        uint256 ongoingLoans;
    }

    Customer [] public customers;
    mapping (address => uint) addressToCustomer;

    modifier onlyAgent(){
        require (getAgentIndex(msg.sender) > 0);
        _;
    }

    function addCustomer(string memory _name, string memory _id) external onlyAgent{
        customers.push(Customer(_name, _id, 0, 0));
    }

    function findById(string memory _id) external view returns (Customer memory)
    {
        Customer memory result;
        for (uint256 i = 0; i < customers.length; ++i) {
            if (keccak256(abi.encodePacked(_id)) == keccak256(abi.encodePacked(customers[i].idNumber)) ) {
                result = customers[i];
                break;
            }
        }
        return result;
    }

}