// SPDX-License-Identifier: Unlicensed
pragma solidity >=0.6.0 <0.8.0;
pragma abicoder v2;

import "./providermanagement.sol";

contract CustomerManagement is ProviderManagement {
    struct Customer {
        string name;
        string idNumber;
        uint256 loansCount;
        uint256 ongoingLoans;
    }

    Customer[] public customers;
    mapping(address => uint256) addressToCustomer;

    modifier onlyAgent() {
        require(getAgentIndex(msg.sender) > 0);
        _;
    }

    event NewCustomerCreated(string _name, string _id);

    function addCustomer(string memory _name, string memory _id)
        external
        onlyAgent
    {
        customers.push(Customer(_name, _id, 0, 0));
        emit NewCustomerCreated(_name, _id);
    }

    function getAllCustomers() public view returns (Customer[] memory) {
        return customers;
    }

    function findCustomerById(string memory _id)
        external
        view
        returns (Customer memory)
    {
        for (uint256 i = 0; i < customers.length; ++i) {
            if (
                keccak256(abi.encodePacked(_id)) ==
                keccak256(abi.encodePacked(customers[i].idNumber))
            ) {
                return customers[i];
            }
        }
        revert("No customer found with that ID");
    }
}
