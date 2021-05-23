# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Metadata / Links:
- SolnSquareVerifier Contract Address: [0x2bd78087cFEB4e37Dec856ACd06Dd78118EFaE72](https://rinkeby.etherscan.io/address/0x2bd78087cfeb4e37dec856acd06dd78118efae72)
- [Etherscan Token-Tracker](https://rinkeby.etherscan.io/token/0x2bd78087cfeb4e37dec856acd06dd78118efae72)
- [OpenSea-Transaction-History](https://testnets.opensea.io/accounts/christn91?tab=activity)

# Testing
To run all contract unit-tests you should be able to run `npm run test`.

# Zokrates-Setup
I had to adjust the Zokrates version to be able to generate a verifier that is compatible with the other contracts
regarding solidity version.

To generate zokrates verifier / proofs you need to do two steps:
1. Change into zokrates directory
2. Run `run_zokrate.sh` to start docker container with the correct zokrates version
3. Inside the container run `generate_proofs.sh`  to generate 10 valid proofs (to mint the 10 tokens) and a verifier contract.

I created a symlink of the zokrates verifier into the `eth-contracts/contracts` directory such that the contract should be automatically updated when you run the above zokrates steps.

# Rinkeby-Deployment

To deploy the contract to rinkeby you have to follow the following steps.
1. Create `.infura` and `.secret` files inside the `eth-contracts` folder and save your infura-key and wallet mnemonic in each respective file.
2. Uncomment Marked blocks inside the `truffle-config.js` file
3. Run `truffle migrate --reset --network=rinkeby`

Note that inside the deploy script 10 tokens are minted using the 10 proofs generated in above mentioned zokrates script, so it will take a while (and cost gas).

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
