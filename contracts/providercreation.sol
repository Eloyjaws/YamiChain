// SPDX-License-Identifier: Unlicensed
pragma solidity >=0.6.0 <0.8.0;
pragma abicoder v2;

// Remote imports

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

import "./safe_math_flavour.sol";

contract ProviderCreation is Ownable {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    uint8 public constant DEFAULT_ACCEPTED_EMPLOYEES = 5;

    event ProviderCreated(
        address indexed _owner,
        string _providerName,
        string _providerLocation
    );

    struct Provider {
        address owner;
        string name;
        string location;
        uint32 joinedOn;
        uint256 maxNumberOfEmployees;
    }

    Provider[] public providers;

    mapping(uint256 => address) public providerToOwner;
    mapping(address => uint256) public idToProvider;

    function getProviders() public view returns (Provider[] memory) {
        return providers;
    }

    function getProviderId(address _owner) public view returns (uint256) {
        return idToProvider[_owner];
    }

    modifier noDuplicateProvider(address _owner) {
        for (uint256 i = 0; i < providers.length; ++i) {
            require(providers[i].owner != _owner);
        }
        _;
    }

    function createProvider(
        address _owner,
        string memory _providerName,
        string memory _providerLocation
    ) public onlyOwner noDuplicateProvider(_owner) {
        providers.push(
            Provider(
                _owner,
                _providerName,
                _providerLocation,
                uint32(block.timestamp),
                DEFAULT_ACCEPTED_EMPLOYEES
            )
        );
        uint256 id = providers.length - 1;
        providerToOwner[id] = _owner;
        emit ProviderCreated(_owner, _providerName, _providerLocation);
    }
}
