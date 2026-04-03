// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";

/**
 * @title PatentRoyaltyVault
 * @notice Reparto de ETH nativo entre payees con shares fijas (patrón clásico tipo PaymentSplitter de OpenZeppelin 4.x).
 *         OpenZeppelin 5.6+ ya no incluye PaymentSplitter en el paquete; esta implementación sigue el mismo modelo económico.
 */
contract PatentRoyaltyVault is ReentrancyGuard {
    event PayeeAdded(address account, uint256 shares);
    event PaymentReleased(address to, uint256 amount);

    uint256 private _totalShares;
    uint256 private _totalReleased;
    address[] private _payees;
    mapping(address => uint256) private _shares;
    mapping(address => uint256) private _released;

    constructor(address[] memory payees, uint256[] memory shares_) {
        require(payees.length == shares_.length, "PatentRoyaltyVault: length mismatch");
        require(payees.length > 0, "PatentRoyaltyVault: no payees");

        for (uint256 i = 0; i < payees.length; i++) {
            _addPayee(payees[i], shares_[i]);
        }
    }

    receive() external payable virtual {}

    function totalShares() public view returns (uint256) {
        return _totalShares;
    }

    function totalReleased() public view returns (uint256) {
        return _totalReleased;
    }

    function shares(address account) public view returns (uint256) {
        return _shares[account];
    }

    function released(address account) public view returns (uint256) {
        return _released[account];
    }

    function payeeCount() public view returns (uint256) {
        return _payees.length;
    }

    function payee(uint256 index) public view returns (address) {
        return _payees[index];
    }

    function releasable(address account) public view returns (uint256) {
        uint256 totalReceived = address(this).balance + _totalReleased;
        return (totalReceived * _shares[account]) / _totalShares - _released[account];
    }

    function release(address payable account) public virtual nonReentrant {
        require(_shares[account] > 0, "PatentRoyaltyVault: no shares");

        uint256 payment = releasable(account);
        require(payment != 0, "PatentRoyaltyVault: not due");

        _released[account] += payment;
        _totalReleased += payment;

        Address.sendValue(account, payment);
        emit PaymentReleased(account, payment);
    }

    function _addPayee(address account, uint256 shares_) private {
        require(account != address(0), "PatentRoyaltyVault: zero address");
        require(shares_ > 0, "PatentRoyaltyVault: zero shares");
        require(_shares[account] == 0, "PatentRoyaltyVault: duplicate payee");

        _payees.push(account);
        _shares[account] = shares_;
        _totalShares += shares_;
        emit PayeeAdded(account, shares_);
    }
}
