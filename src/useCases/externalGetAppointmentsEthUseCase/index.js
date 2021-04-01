const { decrypt } = require('../../helpers/crypto');
const eth = require('../../helpers/eth');
const setup = require('../../config/eth.json');
const parseEthResult = require('../../helpers/parseEthResult');

const externalGetAppointmentsEthUseCase = async ({
  contractAddress,
  accountAddress,
}) => {
  const realContractAddress = decrypt(contractAddress);
  const realAccountAddress = decrypt(accountAddress);

  const contract = new eth.Contract(
    setup.contracts.temporaryAccess.abi,
    setup.contracts.temporaryAccess.address
  );

  const data = await contract.methods
    .get(realContractAddress)
    .call({ from: realAccountAddress });

  return parseEthResult(data);
};

module.exports = externalGetAppointmentsEthUseCase;
