var SiteStore = artifacts.require("./SiteStore.sol");

module.exports = function(deployer) {
  deployer.deploy(SiteStore);
};
