var fs = require('fs');
// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function (deployer, network, accounts) {
  let owner = accounts[0];
  let name = "Christians Token";
  let symbol = "CKT";
  deployer.deploy(SquareVerifier).then(() => {
    return deployer.deploy(SolnSquareVerifier, name, symbol, SquareVerifier.address);
  }).then(async () =>{
    for(var i = 1; i<11; i++){
      const contractInstance = await SolnSquareVerifier.deployed();
      var solution = JSON.parse(fs.readFileSync(`../zokrates/code/square/proofs/proof_${i}.json`, 'utf8'));
      await contractInstance.verifyAndMint(
        solution.proof.A,
        solution.proof.A_p,
        solution.proof.B,
        solution.proof.B_p,
        solution.proof.C,
        solution.proof.C_p,
        solution.proof.H,
        solution.proof.K,
        solution.input,
        owner,
        i,
      );
    }
  });
};
