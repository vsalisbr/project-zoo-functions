const data = require('../data/zoo_data');

const getOldestFromFirstSpecies = (id) => {
  const specieId = data
    .employees
    .find((employee) => employee.id === id)
    .responsibleFor[0];
  const animals = data
    .species
    .find((specie) => specie.id === specieId)
    .residents;
  animals.sort((animal1, animal2) => animal2.age - animal1.age);
  return [animals[0].name, animals[0].sex, animals[0].age];
};

module.exports = getOldestFromFirstSpecies;
