require("chai").use(require("chai-as-promised")).should();
const SiteStore = artifacts.require("./SiteStore.sol");

contract("SiteStore", (accounts) => {
  let person1, person2;
  before(async () => {
    person1 = accounts[0];
    person2 = accounts[1];
  });

  it("should put some domains onto the DNS and then remove them", async () => {
    const siteStore = await SiteStore.new();

    await siteStore.addSiteToDNS("DDDD", "AAAA", { from: person1 });

    let res = await siteStore.dnsInUse("DDDD");
    assert.equal(res.toString(), "true");

    res = await siteStore.ipfsDNS("DDDD");
    assert.equal(res.ipfsCID.toString(), "AAAA");

    await siteStore.deleteSiteDNS("DDDD", { from: person1 });

    res = await siteStore.dnsInUse("DDDD");
    assert.equal(res.toString(), "false");
  });
  it("should put some domains onto the DNS and then add the same one and fail", async () => {
    const siteStore = await SiteStore.new();
    await siteStore.addSiteToDNS("DDDD", "AAAA", { from: person1 });
    let res = await siteStore.dnsInUse("DDDD");
    assert.equal(res.toString(), "true");
    await siteStore.addSiteToDNS("DDDD", "AAAA", { from: person1 }).should.be
      .rejected;
  });
  it("should reject someone trying to delete a site which they do not owner", async () => {
    const siteStore = await SiteStore.new();

    await siteStore.addSiteToDNS("DDDD", "AAAA", { from: person1 });

    let res = await siteStore.dnsInUse("DDDD");
    assert.equal(res.toString(), "true");

    await siteStore.deleteSiteDNS("DDDD", { from: person2 }).should.be.rejected;
  });
});
