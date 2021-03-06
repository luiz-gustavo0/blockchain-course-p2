var MyToken = artifacts.require('MyToken.sol');
var MyTokenSale = artifacts.require('MyTokenSale.sol');
var KycContract = artifacts.require('KycContract.sol');

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(MyToken, 1000000);
  await deployer.deploy(KycContract);
  await deployer.deploy(
    MyTokenSale,
    1,
    addr[0],
    MyToken.address,
    KycContract.address
  );
  let instance = await MyToken.deployed();
  await instance.transfer(MyTokenSale.address, 1000000);
};
