const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PatentRoyaltyVault", function () {
  it("reparte ETH según shares", async function () {
    const [deployer, a, b] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("PatentRoyaltyVault");
    const vault = await Factory.deploy([a.address, b.address], [1n, 1n]);
    await vault.waitForDeployment();
    const addr = await vault.getAddress();

    await deployer.sendTransaction({ to: addr, value: ethers.parseEther("1.0") });

    const half = ethers.parseEther("0.5");
    await expect(vault.release(a.address)).to.changeEtherBalance(a, half);
    await expect(vault.release(b.address)).to.changeEtherBalance(b, half);

    expect(await ethers.provider.getBalance(addr)).to.equal(0n);
  });
});
