// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// Set of rules to be able to retrieve a customer by their details

contract InformationStorage {
    struct Customer {
        string name;
        string id_number;
        address identifier;
    }

    Customer [] customers;

    // Rules of who can add a customer. Should ideally be an employee
    // #TODO: Need to set up a modifier to check if the user can access any thing here

    function addCustomer (string memory _name, string memory _id, address _reference) external {
        customers.push(Customer(_name, _id, _reference));
    }

    function findByAddress (address _target) external view returns (Customer memory) {
        Customer memory result;
        for (uint i = 0; i < customers.length; ++i) {
            if (customers[i].identifier == _target) {
                result = customers[i];
                break;
            }
        }
        return result;
    }

    // Ideally this should do some regex but this is not possible in Solidity
    function findByName (string memory _name) external view returns (Customer memory) {
        Customer memory result;
        for (uint i = 0; i < customers.length; ++i) {
            if (keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(customers[i].name)) ) {
                result = customers[i];
                break;
            }
        }
        return result;
    }

    function findById (string memory _id) external view returns (Customer memory) {
        Customer memory result;
        for (uint i = 0; i < customers.length; ++i) {
            if (keccak256(abi.encodePacked(_id)) == keccak256(abi.encodePacked(customers[i].id_number)) ) {
                result = customers[i];
                break;
            }
        }
        return result;
    }

}