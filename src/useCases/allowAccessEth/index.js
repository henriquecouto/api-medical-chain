const { decrypt } = require('../../helpers/crypto');
const eth = require('../../helpers/eth');
const sendMail = require('../../helpers/sendMail');
const setup = require('../../config/eth.json');

const allowAccessEthUseCase = async ({
  contractAddress,
  accountAddress,
  allowUntil,
  email,
  applicationAddress,
}) => {
  const realContractAddress = decrypt(contractAddress);
  const realAccountAddress = decrypt(accountAddress);

  const contract = new eth.Contract(
    setup.contracts.temporaryAccess.abi,
    setup.contracts.temporaryAccess.address
  );
  await contract.methods
    .allowAccess(allowUntil, realContractAddress, realAccountAddress)
    .send({ from: setup.ownerAccount });

  const redirectPath = `${applicationAddress}?contractAddress=${JSON.stringify(
    contractAddress
  )}&accountAddress=${JSON.stringify(accountAddress)}`;

  sendMail({
    receiverEmail: email,
    message: {
      subject: 'Você recebeu acesso a um novo atendimento do MedicalCare',
      content: `
        <div>
          <h2>Você recebeu acesso a um novo atendimento no MedicalCare</h2>
          <h4>Para acessar utilize o link abaixo, ou <a href='${redirectPath}'>clique aqui</a></h4>
          <a href='${redirectPath}'>${redirectPath}</a>
        </div>
      `,
    },
  });

  return {
    redirectPath,
    contractAddress,
    accountAddress,
    allowUntil,
    email,
  };
};

module.exports = allowAccessEthUseCase;
