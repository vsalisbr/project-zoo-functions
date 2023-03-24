const data = require('../data/zoo_data');

const filterAnimalsBySpecie = (filters) => data
  .species
  .filter((specie) => specie.name === filters.species);

const countAnimalsBySex = (animals, filters) => {
  const filter = animals
    .filter((animal) => {
      if (filters.sex) {
        return animal.sex === filters.sex;
      }
      return true;
    });
  return filter.length;
};

const allAnimalsWithAmount = () => {
  const animals = data
    .species
    .map((specie) => ({
      name: specie.name,
      qtd: specie.residents.length,
    }))
    .reduce((acc, obj) => {
      acc[obj.name] = obj.qtd;
      return acc;
    }, {});
  return animals;
};

const countAnimals = (filters) => {
  if (filters && filters.species) {
    const qtd = countAnimalsBySex(filterAnimalsBySpecie(filters)[0].residents, filters);
    return qtd;
  }
  return allAnimalsWithAmount();
};

countAnimals({ species: 'giraffes', sex: 'female' });

module.exports = countAnimals;
