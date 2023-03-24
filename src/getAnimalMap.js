const data = require('../data/zoo_data');

const getMap = () => ({
  NE: [],
  NW: [],
  SE: [],
  SW: [],
});

const getAllSpeciesByMap = () => {
  const map = getMap();
  Object.keys(map).forEach((location) => {
    const species = data
      .species
      .filter((specie) => specie.location === location)
      .map((specie) => specie.name);
    map[location] = species;
  });
  return map;
};

const getAllAnimalsByMap = (filters) => {
  const map = getMap();
  Object.keys(map).forEach((location) => {
    map[location] = data.species
      .filter((specie) => specie.location === location)
      .reduce((acc, obj) => {
        acc.push(
          {
            [obj.name]: obj.residents
              .filter((resident) => {
                if (filters.sex) return resident.sex === filters.sex; return true;
              })
              .map((resident) => resident.name),
          },
        );
        return acc;
      }, []);
  });
  return map;
};

const sortMap = (map) => {
  Object.keys(map).forEach((location) => {
    map[location].forEach((species) => {
      Object.keys(species).forEach((specie) => {
        species[specie].sort();
      });
    });
  });
  return map;
};

const getAnimalMap = (filters) => {
  if (!filters || !filters.includeNames) {
    return getAllSpeciesByMap();
  }
  let map = getAllAnimalsByMap(filters);
  if (filters.sorted === true) {
    map = sortMap(map);
  }
  return map;
};

module.exports = getAnimalMap;
