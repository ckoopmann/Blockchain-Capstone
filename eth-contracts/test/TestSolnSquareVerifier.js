// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var verifier = artifacts.require("verifier");
var solnSquareVerifier = artifacts.require("SolnSquareVerifier");
var correctSolution = require("../../zokrates/code/square/proofs/proof_1.json");

contract("TestSolnSquareVerifier", (accounts) => {
  const account_one = accounts[0];
  const name = "NAME";
  const symbol = "SYMBOL";
  const account_two = accounts[1];

  describe("SolnSquareVerifier", function () {
    beforeEach(async function () {
      this.verifierContract = await verifier.new({
        from: account_one,
      });
      this.solnSquareVerifierContract = await solnSquareVerifier.new(
        name,
        symbol,
        this.verifierContract.address,
        {
          from: account_one,
        }
      );
    });

    it("Should mint token when valid solution is proided", async function () {
      const to = account_one;
      const tokenID = 1;
      await this.solnSquareVerifierContract.verifyAndMint(
        correctSolution.proof.A,
        correctSolution.proof.A_p,
        correctSolution.proof.B,
        correctSolution.proof.B_p,
        correctSolution.proof.C,
        correctSolution.proof.C_p,
        correctSolution.proof.H,
        correctSolution.proof.K,
        correctSolution.input,
        to,
        tokenID,
        { from: account_one }
      );
      const balance = await this.solnSquareVerifierContract.balanceOf(account_one);
      assert.equal(
        balance,
        1,
        "Users balance did not increase despite valid proof"
      );
    });

    it("should not verify incorrect solution", async function () {
      let incorrectSolution = JSON.parse(JSON.stringify(correctSolution));;
      incorrectSolution.proof.A_p = correctSolution.proof.B_p;
      const to = account_two;
      const tokenID = 2;
      let failed = false;
      try{
        await this.solnSquareVerifierContract.verifyAndMint(
          incorrectSolution.proof.A,
          incorrectSolution.proof.A_p,
          incorrectSolution.proof.B,
          incorrectSolution.proof.B_p,
          incorrectSolution.proof.C,
          incorrectSolution.proof.C_p,
          incorrectSolution.proof.H,
          incorrectSolution.proof.K,
          incorrectSolution.input,
          to,
          tokenID,
          { from: account_two }
        );
      }
      catch {
        failed = true;
      }
      const balance = await this.solnSquareVerifierContract.balanceOf(account_two);
      assert.equal(
        failed,
        true,
        "transaction suceeded despite invalid proof"
      );
      assert.equal(
        balance,
        0,
        "Users balance did increase despite invalid proof"
      );
    });
  });
});
