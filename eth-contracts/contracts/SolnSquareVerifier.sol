pragma solidity >=0.4.21 <0.6.0;
import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract Verifier {
    function verifyTx(
            uint[2] memory a,
            uint[2] memory a_p,
            uint[2][2] memory b,
            uint[2] memory b_p,
            uint[2] memory c,
            uint[2] memory c_p,
            uint[2] memory h,
            uint[2] memory k,
            uint[2] memory input
        ) public returns (bool r);
}



// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete {
    Verifier verifier;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => bool) submittedSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(bytes32 solutionHash);

    constructor(string memory name, string memory symbol, address verifierAddress) public ERC721MintableComplete(name, symbol){
        verifier = Verifier(verifierAddress);
    }

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(bytes32 solutionHash) internal {
        submittedSolutions[solutionHash] = true;
        emit SolutionAdded(solutionHash);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function verifyAndMint(
            uint[2] memory a,
            uint[2] memory a_p,
            uint[2][2] memory b,
            uint[2] memory b_p,
            uint[2] memory c,
            uint[2] memory c_p, uint[2] memory h,
            uint[2] memory k,
            uint[2] memory input,
            address to,
            uint256 tokenId
    ) public returns(bool){
        bytes32 solutionHash = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));
        require(!submittedSolutions[solutionHash], "Given solution has already been submitted before");
        bool solutionValid = verifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input);
        require(solutionValid, "Given solution is invalid");
        addSolution(solutionHash);
        return super.mint(to, tokenId);
    }

}
