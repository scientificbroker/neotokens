const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PatentAsset", function () {
  it("acuña con tokenURI y asigna propiedad", async function () {
    const [owner, alice] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("PatentAsset");
    const nft = await Factory.deploy(owner.address);
    await nft.waitForDeployment();

    await expect(nft.connect(alice).safeMint(alice.address, "ipfs://QmAlpha")).to.be.revertedWithCustomError(
      nft,
      "OwnableUnauthorizedAccount"
    );

    await nft.safeMint(alice.address, "ipfs://QmAlpha");
    expect(await nft.ownerOf(1n)).to.equal(alice.address);
    expect(await nft.tokenURI(1n)).to.equal("ipfs://QmAlpha");
    expect(await nft.balanceOf(alice.address)).to.equal(1n);
    expect(await nft.totalSupply()).to.equal(1n);
  });

  it("pausa y bloquea transferencias", async function () {
    const [owner, alice, bob] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("PatentAsset");
    const nft = await Factory.deploy(owner.address);
    await nft.waitForDeployment();
    await nft.safeMint(alice.address, "ipfs://QmX");

    await nft.pause();
    await expect(nft.connect(alice).transferFrom(alice.address, bob.address, 1n)).to.be.revertedWithCustomError(
      nft,
      "EnforcedPause"
    );

    await nft.unpause();
    await nft.connect(alice).transferFrom(alice.address, bob.address, 1n);
    expect(await nft.ownerOf(1n)).to.equal(bob.address);
  });
});
