const Token = artifacts.require('MyToken');

let chai = require('chai');
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

contract('Token Test', async (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

  it('all tokens should be in my account', async () => {
    const instance = await Token.deployed();
    const totalSupply = await instance.totalSupply();

    expect(await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(
      totalSupply
    );
  });

  it('is possible to send tokens between accounts', async () => {
    const sendTokens = 1;
    const instance = await Token.deployed();
    const totalSupply = await instance.totalSupply();
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
    expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
  });
  expect(
    instance.balanceOf(deployerAccount)
  ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
  expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(
    new BN(sendTokens)
  );
});
