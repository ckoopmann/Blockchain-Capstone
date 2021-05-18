var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');
var ERC721Metadata = artifacts.require('ERC721Metadata');
var ERC721Enumerable = artifacts.require('ERC721Enumerable');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const name = "NAME";
    const symbol = "SYMBOL";
    const tokenIds = [1, 2, 3]

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, {from: account_one});

            // TODO: mint multiple tokens
            for(tokenId of tokenIds){
              await this.contract.mint(account_one, tokenId, {from: account_one});
            }
        })

        it('should return total supply', async function () { 
          const totalSupply = await this.contract.totalSupply();
          assert.equal(totalSupply, tokenIds.length, "Incorrect Total supply after initial minting")

            
        })

        it('should get token balance', async function () { 
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            
        })

        it('should transfer token from one owner to another', async function () { 
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, {from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
        })

        it('should return contract owner', async function () { 
            
        })

    });
})
