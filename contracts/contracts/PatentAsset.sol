// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PatentAsset
 * @notice ERC-721 piloto para representar un activo de PI on-chain (metadata vía tokenURI, típicamente IPFS).
 *         Uso testnet / demostración. No sustituye documentación legal ni registros de propiedad.
 */
contract PatentAsset is ERC721Enumerable, ERC721URIStorage, ERC721Pausable, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner) ERC721("NeoTokens Patent Asset", "NTPA") Ownable(initialOwner) {
        _nextTokenId = 1;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @param to destinatario del NFT
     * @param uri tokenURI final (p. ej. ipfs://CID/metadata.json)
     */
    function safeMint(address to, string calldata uri) external onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }
}
