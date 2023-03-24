const data = require('../data/zoo_data');

const ageGroup = (age) => {
  if (age < 18) {
    return 'child';
  }
  if (age >= 18 && age < 50) {
    return 'adult';
  }
  if (age >= 50) {
    return 'senior';
  }
};

const countEntrants = (entrants) => entrants
  .reduce((acc, obj) => {
    const group = ageGroup(obj.age);
    if (acc[group]) {
      acc[group] += 1;
    } else {
      acc[group] = 1;
    }
    return acc;
  }, {});

const calculateEntry = (entrants) => {
  if (!Array.isArray(entrants) || entrants.length <= 0) {
    return 0;
  }
  const groups = countEntrants(entrants);
  let value = 0;
  Object.keys(groups).forEach((group) => {
    value += data.prices[group] * groups[group];
  });
  return Number(parseFloat(value).toFixed(2));
};

module.exports = { calculateEntry, countEntrants };
