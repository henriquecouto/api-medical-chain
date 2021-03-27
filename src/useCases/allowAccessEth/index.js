const { decrypt } = require('../../helpers/crypto');
const eth = require('../../helpers/eth');
const setup = require('../../setup/eth.json');

const allowAccessEthUseCase = async ({
  contractAddress,
  accountAddress,
  allowUntil,
  email,
}) => {
  const realContractAddress = decrypt(contractAddress);
  const realAccountAddress = decrypt(accountAddress);

  const contract = new eth.Contract(
    setup.contracts.temporaryAccess.abi,
    setup.contracts.temporaryAccess.address
  );
  const result = await contract.methods
    .allowAccess(allowUntil, realContractAddress, realAccountAddress)
    .send({ from: setup.ownerAccount });

  // @TODO enviar email informando link de acesso

  return result;
};

module.exports = allowAccessEthUseCase;
