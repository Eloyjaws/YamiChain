// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '../access/Ownable.sol';
import '../access/AccessControl.sol';

contract Provider is Ownable, AccessControl {
    AccessControl.RoleData private _readers;
    AccessControl.RoleData private _editors;
    
    bytes32 public constant EDITING_ROLE = keccak256("EDITING_ROLE");

    modifier onlyAdmin (){
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender));
        _;
    }

    function addEmployee(address _account) external onlyAdmin {
        // We add a new employee to the contract (the organization)
        grantRole(EDITING_ROLE, _account);
    }

    function removeEmployee (address _account) external onlyAdmin{
        // We remove an employee from the organization
        // Here we will just remove the access rights since looping through the array will be costly
        revokeRole(EDITING_ROLE, _account);
    }

    // Should this remain here or should we change the access rights?
     function isEmployee (address _address) external view returns (bool) {
        return hasRole(EDITING_ROLE, _address);
    }

    // Wanted to implement this function but we can actually call it directly from the main contract.

    // function checkCustomerRecords (address _customer, string memory _type='full') external view {

    // }
    
}