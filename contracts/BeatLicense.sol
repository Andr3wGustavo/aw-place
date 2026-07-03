// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title AWPLACE Beat License NFT
 * @dev ERC1155 Contract for selling beat licenses with built-in EIP-2981 royalties.
 * Security: Uses OpenZeppelin standard, audited libraries to prevent Reentrancy and Overflow.
 */
contract BeatLicense is ERC1155, Ownable, ERC1155Supply, ERC2981 {
    using Strings for uint256;

    // Mapping to store prices in Wei for each license type (token ID)
    mapping(uint256 => uint256) public licensePrices;
    
    // Mapping for token URIs (IPFS Links)
    mapping(uint256 => string) private _tokenURIs;

    string public name = "AWPLACE Licenses";
    string public symbol = "AWP";

    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {
        // Set default royalty to the owner at 5% (500 basis points)
        _setDefaultRoyalty(initialOwner, 500);
    }

    /**
     * @dev Mint a new license. User pays the required ETH price.
     */
    function mintLicense(uint256 id, uint256 amount) public payable {
        require(licensePrices[id] > 0, "License not for sale");
        require(msg.value >= licensePrices[id] * amount, "Insufficient ETH sent");

        _mint(msg.sender, id, amount, "");
    }

    /**
     * @dev Admin creates a new beat license type and sets its price.
     */
    function createLicense(uint256 id, uint256 priceInWei, string memory uri_) public onlyOwner {
        require(licensePrices[id] == 0, "License already exists");
        licensePrices[id] = priceInWei;
        _tokenURIs[id] = uri_;
    }

    function uri(uint256 tokenId) public view virtual override returns (string memory) {
        string memory tokenURI = _tokenURIs[tokenId];
        return bytes(tokenURI).length > 0 ? tokenURI : super.uri(tokenId);
    }

    /**
     * @dev Withdraw funds collected from sales securely to the creator's wallet.
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    // --- Overrides required by Solidity ---
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
}
