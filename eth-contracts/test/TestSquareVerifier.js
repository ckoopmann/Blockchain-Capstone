// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates

// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps

// Test verification with incorrect proof
var verifier = artifacts.require("verifier");

contract("TestVerifier", (accounts) => {
  const account_one = accounts[0];

  describe("Verifier", function () {
    beforeEach(async function () {
      this.contract = await verifier.new({
        from: account_one,
      });
    });

    it("should verify correct solution", async function () {
    });
  });
});
