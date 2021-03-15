// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

// Remote imports
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// Local imports
import "./Provider.sol";

contract YamiChain is Ownable, AccessControl{
    bytes32 public constant EDITING_ROLE = keccak256("EDITING_ROLE");

    mapping (address => Provider) public providers;

    modifier onlyAdmin (){
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender));
        _;
    }

    function addProvider(address _provider, string memory _providerName, string memory _providerLocation) public onlyOwner {
        providers[_provider] = new Provider(_provider, _providerName, _providerLocation);
    }
    
}
