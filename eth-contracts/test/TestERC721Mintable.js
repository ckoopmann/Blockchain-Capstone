var ERC721MintableComplete = artifacts.require("ERC721MintableComplete");
var ERC721Metadata = artifacts.require("ERC721Metadata");
var ERC721Enumerable = artifacts.require("ERC721Enumerable");

contract("TestERC721Mintable", (accounts) => {
  const account_one = accounts[0];
  const account_two = accounts[1];
  const name = "NAME";
  const symbol = "SYMBOL";
  const tokenIds = [1, 2, 3];
  const baseURI =
    "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

  describe("match erc721 spec", function () {
    beforeEach(async function () {
      this.contract = await ERC721MintableComplete.new(name, symbol, {
        from: account_one,
      });

      // TODO: mint multiple tokens
      for (tokenId of tokenIds) {
        await this.contract.mint(account_one, tokenId, { from: account_one });
      }
    });

    it("should return total supply", async function () {
      const totalSupply = await this.contract.totalSupply();
      assert.equal(
        totalSupply,
        tokenIds.length,
        "Incorrect Total supply after initial minting"
      );
    });

    it("should get token balance", async function () {
      const balance = await this.contract.balanceOf(account_one);
      assert.equal(
        balance,
        tokenIds.length,
        "Incorrect balance after initial minting"
      );
    });

    // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it("should return token uri", async function () {
      for (tokenId of tokenIds) {
        let tokenURI = await this.contract.tokenURI(tokenId, {
          from: account_one,
        });
        let expectedURI = baseURI + tokenId;
        assert.equal(tokenURI, expectedURI, "Incorrect Token URI");
      }
    });

    it("should transfer token from one owner to another", async function () {
      for (tokenId of tokenIds) {
        await this.contract.transferFrom(account_one, account_two, tokenId, {
          from: account_one,
        });
      }
      const balance_one = await this.contract.balanceOf(account_one);
      assert.equal(
        balance_one,
        0,
        "Original owner should have zero balance after transfer"
      );
      const balance_two = await this.contract.balanceOf(account_two);
      assert.equal(
        balance_two,
        tokenIds.length,
        "New owner should have balance equal to number of transfered tokens"
      );
    });
  });

  describe("have ownership properties", function () {
    beforeEach(async function () {
      this.contract = await ERC721MintableComplete.new(name, symbol, {
        from: account_one,
      });
    });

    it("should fail when minting when address is not contract owner", async function () {
      let failed = false;
      const tokenId = 10;
      try {
        await this.contract.mint(account_one, tokenId, { from: account_two });
      } catch {
        failed = true;
      }

      assert.equal(failed, true, "Minting from non owner was not prevented");
    });

    it("should return contract owner", async function () {
      const owner = await this.contract.getOwner.call();
      assert.equal(owner, account_one, "Wrong owner was returned");
    });
  });
});
