// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

// Remote imports

import "@openzeppelin/contracts/access/Ownable.sol";

// Local imports
import "./Provider.sol";
import "./InformationStorage.sol";

contract YamiChain is Ownable {
    bytes32 public constant EDITING_ROLE = keccak256("EDITING_ROLE");

    mapping (address => Provider) public providers;
    InformationStorage public customerRecords;

    function addProvider(address _provider, string memory _providerName, string memory _providerLocation) public onlyOwner {
        Provider provider = new Provider(_provider, _providerName, _providerLocation);
        providers[_provider] = provider;
        provider.transferOwnership(_provider);   
    }
    
}
