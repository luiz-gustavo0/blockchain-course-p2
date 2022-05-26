pragma solidity ^0.6.1;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract KycContract is Ownable{
  mapping(address => bool) allowed;

  function setKycCompleted(address addr) public onlyOwner{
    allowed[addr] = true;
  }

  function setKycRevoked(address addr) public onlyOwner{
    allowed[addr] = false;
  }

   function kycCompleted(address addr) public view returns(bool) {
    return allowed[addr];
  }
}