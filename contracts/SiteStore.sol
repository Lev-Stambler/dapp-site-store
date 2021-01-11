pragma solidity ^0.7.0;

contract SiteStore {
    struct Site {
        string ipfsCID;
        address owner;
    }

    mapping(string => Site) public ipfsDNS;
    mapping(string => bool) public dnsInUse;

    constructor() {}

    function addSiteToDNS(string memory name, string memory ipfsCID) public {
        require(msg.sender != address(0), "An address is required to be send with the messege");
        require(dnsInUse[name] == false, "This DNS name is already in use");
        ipfsDNS[name] = Site(ipfsCID, msg.sender);
        dnsInUse[name] = true;
    }

    function deleteSiteDNS(string memory name) public {
        require(
            msg.sender != address(0) && ipfsDNS[name].owner == msg.sender,
            "You can only delete sites which you own"
        );
        if (dnsInUse[name]) {
            dnsInUse[name] = false;
            ipfsDNS[name] = Site("", address(0));
        }
    }
}
