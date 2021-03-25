const { decrypt } = require('../../helpers/crypto');

const allowAccessEthUseCase = async ({
  contractAddress,
  accountAddress,
  allowUntil,
  email,
}) => {
  const realContractAddress = decrypt(contractAddress);
  const realAccountAddress = decrypt(accountAddress);

  // @TODO chamar método allowAccess do contrato TemporaryAccess
  // @TODO enviar email informando link de acesso

  return {
    contractAddress,
    accountAddress,
    allowUntil,
    email,
    realContractAddress,
    realAccountAddress,
  };
};

module.exports = allowAccessEthUseCase;
