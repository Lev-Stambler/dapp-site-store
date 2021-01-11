pragma solidity ^0.7.0;

contract SiteStore {
    mapping(string => string) public ipfsDNS;
    mapping(string => bool) public dnsInUse;

    constructor() {}

    function addSiteToDNS(string memory name, string memory ipfsPath) public {
        require(dnsInUse[name] == false, "This DNS name is already in use");
        ipfsDNS[name] = ipfsPath;
        dnsInUse[name] = true;
    }

    function deleteSiteDNS(string memory name) public {
        if (dnsInUse[name]) {
            dnsInUse[name] = false;
            ipfsDNS[name] = "";
        }
    }
}