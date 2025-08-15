// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

/**
 * @title TokenICO
 * @dev A gas-optimized ICO contract for token sales.
 * 
 * Features:
 * - Configurable token pirce
 * - Proper handling of token decimals
 * - Direct ETH transfers to owner
 * - Gas Optimization for mainnet deployment
 * - Token rescue functionality
 * - Protection agains direct ETH transfers
 * 
 * This contract has been audited and gas optimized.
 * Last update: August 2025
 * Author: Anais.Z
 */

interface IERC20 {
    function transfer(address recipiend, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}
contract TokenICO{
    // STATE VARIABLES
    //Only one address for the owner what the industry do.
    address public immutable owner;
    address public saleToken;
    uint256 public ethPriceForToken = 0.001 ether;
    uint256 public tokenSold;
    // EVENTS
    // indexed = because the buyer will be the only user, so we can index that data based on the buyer address.
    event TokenPurchased(address indexed buyer, uint256 amount, uint256 tokensBought);
    event PriceUpdated(uint256 oldPrice, uint256 newPrice);
    event SaleTokenSet(address indexed token);

    // CUSTOM ERROR for fgas savings
    error OnlyOwner();
    error InvalidPrice();
    error InvalidAddress();
    error NoEthSent();
    error SaleTokenNotSet();
    error TokenTransferFailed();
    error EthTransferFailed();
    error NoTokenToWithdraw();
    error CannnotRescueSaleToken();
    error NoTokensToRescue();
    error UseTokenFunction();


    modifier onlyOwner() {
        if(msg.sender != owner) {
            revert OnlyOwner();
        }
        _;

    }
    constructor() {
        owner = msg.sender;
    }
    // PREVENT DIRECT ETH TRANSFERS
    receive() external payable {
        revert UseTokenFunction();
    }

    // ADMIN FUNCTIONS
    function updateTokenPrice(uint256 newPrice) external onlyOwner{
        if(newPrice == 0) revert InvalidPrice(); 
        uint256 oldPrice = ethPriceForToken;
        ethPriceForToken = newPrice;
        emit PriceUpdated(oldPrice, newPrice);
    }

    function setSaleToken(address _token) external onlyOwner{
        if(_token == address(0)) revert InvalidAddress();
        saleToken = _token;
        emit SaleTokenSet(_token);
    }

    function withdrawAllTokens() external onlyOwner{
        address token = saleToken;
        uint256 balance = IERC20(token).balanceOf(address(this));
        if(balance ==0)  revert NoTokenToWithdraw();
        if(!IERC20(token).transfer(owner, balance)) revert TokenTransferFailed();
    }

    // USER FUNCTIONS
    function buyToken() external payable{
        if(msg.value == 0) revert NoEthSent();

        address token = saleToken;
        if(token == address(0)) revert SaleTokenNotSet();
        
        //CALCULATE TOKEN AMOUNT ACCORDING TO TOKEN DECIMALS
        IERC20 tokenContract = IERC20(token);
        uint8 decimals = tokenContract.decimals();
        uint256 tokenAmount = (msg.value * (10**decimals)) / ethPriceForToken;

        //PROCESS TOKEN PURCHASE
        unchecked{
            tokenSold+= tokenAmount;
        }
        
        // TOKEN TRANSFER
        if(!tokenContract.transfer(msg.sender, tokenAmount)) revert TokenTransferFailed();

        //ETH TRANSFER TO OWNER
        (bool success,)  = owner.call{value:msg.value}("");
        if(!success) revert EthTransferFailed();

        emit TokenPurchased(msg.sender, msg.value, tokenAmount);
    }
    
    function rescueTokens(address tokenAddress) external onlyOwner{
        if (tokenAddress == saleToken) revert CannnotRescueSaleToken();
         
         IERC20 tokenContract = IERC20(tokenAddress);
         uint256 balance = tokenContract.balanceOf(address(this));
            if(balance == 0) revert NoTokensToRescue();
            if (!tokenContract.transfer(owner, balance)) {
                revert TokenTransferFailed();
            }
    }

    // VIEW FUNCTIONS
    function getContractInfo() external view returns(
        address tokenAddress, 
        string memory tokenSymbol, 
        uint8 tokenDecimals, 
        uint256 tokenBalance, 
        uint256 ethPrice, 
        uint256 totalSold) {
        address token = saleToken;
        IERC20 tokenContract = IERC20(token);
        return (
            token, 
            tokenContract.symbol(),
            tokenContract.decimals(),
            tokenContract.balanceOf(address(this)),
            ethPriceForToken,
            tokenSold
        );
    }

}