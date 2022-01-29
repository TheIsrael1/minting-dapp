//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MintExample is ERC721Enumerable, Ownable{
    mapping(address => uint256) public balances;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol){} //pass in because we are inheriting from the enumerable

    function mint(uint256 numberOfMints) public payable {
        uint256 supply = totalSupply();
        // totalSupply() is a function in the enumerable, gives us a way to grab the totla supply
        for(uint256 i; i < numberOfMints; i++){
            _safeMint(msg.sender, supply + i);
            balances[msg.sender]++;
        }
    }
}
