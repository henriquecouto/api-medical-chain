/* eslint-disable no-restricted-globals */

const parseEthResult = data => {
  const keys = Object.keys(data).filter(key => isNaN(key));
  let result = data;

  if (keys.length) {
    result = keys.reduce(
      (o, key) => Object.assign(o, { [key]: data[key] }),
      {}
    );

    Object.keys(result).forEach(key => {
      if (typeof result[key] === 'object') {
        result[key] = parseEthResult(result[key]);
      }
    });
  }

  return result;
};

module.exports = parseEthResult;
