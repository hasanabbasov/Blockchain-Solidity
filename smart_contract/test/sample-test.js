const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("Transactions", function () {
  let Transactions;
  let transactions;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Transactions = await ethers.getContractFactory("Transactions");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    transactions = await Transactions.deploy();
    await transactions.deployed();
  });

  it("should add a new transaction", async function () {
    await transactions.connect(owner).addToBlockchain(addr1.address, ethers.utils.parseEther("1.0"), "Test transaction", "keyword", { value: ethers.utils.parseEther("1.0") });
    const count = await transactions.getTransactionCount();
    expect(count).to.equal(1);
  });

  it("should retrieve all transactions", async function () {
    await transactions.connect(owner).addToBlockchain(addr1.address, ethers.utils.parseEther("1.0"), "Test transaction", "keyword", { value: ethers.utils.parseEther("1.0") });

    const transactionList = await transactions.getAllTransactions();

    expect(transactionList.length).to.equal(1);
    expect(transactionList[0].sender).to.equal(owner.address);
    expect(transactionList[0].receiver).to.equal(addr1.address);
    expect(transactionList[0].amount.toString()).to.equal(ethers.utils.parseEther("1.0").toString());
    expect(transactionList[0].message).to.equal("Test transaction");
    expect(transactionList[0].keyword).to.equal("keyword");
  });

  describe("Transaction errors", function() {
    it("should fail if the amount is incorrect", async function () {
      await expect(transactions.connect(owner).addToBlockchain(addr1.address, ethers.utils.parseEther("1.0"), "Test transaction", "keyword", { value: ethers.utils.parseEther("0.5") })).to.be.revertedWith("Amount is not correct!");
    });

    it("should fail if a non-owner tries to add a transaction", async function () {
      await expect(transactions.connect(addr1).addToBlockchain(addr2.address, ethers.utils.parseEther("1.0"), "Test transaction", "keyword", { value: ethers.utils.parseEther("1.0") })).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
