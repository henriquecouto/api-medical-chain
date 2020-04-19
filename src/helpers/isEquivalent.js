const isEquivalent = (a, b) => {
  delete a.__v;
  delete b.__v;
  delete a._id;
  delete b._id;
  // Create arrays of property names
  const aProps = Object.keys(a);
  const bProps = Object.keys(b);

  console.log({ aProps, bProps });

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
    console.log('numpropsdifferent');
    return false;
  }

  for (let i = 0; i < aProps.length; i += 1) {
    const propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    console.log(
      JSON.stringify(a[propName]) !== JSON.stringify(b[propName]),
      JSON.stringify(a[propName]),
      JSON.stringify(b[propName])
    );
    let objects = true;
    if (JSON.stringify(a[propName]) !== JSON.stringify(b[propName])) {
      if (typeof a[propName] === 'object') {
        objects = isEquivalent(a[propName], b[propName]);
      }
      if (!objects) {
        console.log('propvaluedifferent');
        return false;
      }
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
};

module.exports = isEquivalent;
