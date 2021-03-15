// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Provider is Ownable, AccessControl {
    string public name;
    string public location;
    
    bytes32 public constant EDITING_ROLE = keccak256("EDITING_ROLE");

    modifier onlyAdmin (){
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender));
        _;
    }

    event ProviderCreated(string indexed providerName, address indexed currentAdmin);

    constructor (address _admin, string memory _name, string memory _location){
        name = _name;
        location = _location;

        // Now set the rights to this
        grantRole(DEFAULT_ADMIN_ROLE, _admin);
        emit ProviderCreated(_name, _admin);
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