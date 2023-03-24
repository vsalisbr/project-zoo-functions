const data = require('../data/zoo_data');

const isEmployeeId = (id) => data
  .employees
  .some((employee) => employee.id === id.id);

const isEmployeeNameOrLastName = (nameOrLastName) => data
  .employees
  .some(
    (employee) =>
      employee.firstName === nameOrLastName.name
      || employee.lastName === nameOrLastName.name,
  );

const getEmployee = (idOrNameOrLastName) => {
  if (idOrNameOrLastName.id && isEmployeeId(idOrNameOrLastName)) {
    const { id } = idOrNameOrLastName;
    return data
      .employees
      .find((employee) => employee.id === id);
  }
  if (idOrNameOrLastName.name && isEmployeeNameOrLastName(idOrNameOrLastName)) {
    const { name } = idOrNameOrLastName;
    return data
      .employees
      .find(
        (employee) =>
          employee.firstName === name
          || employee.lastName === name,
      );
  }
  throw new Error('Informações inválidas');
};

const getSpeciesForEmployee = (employee) => {
  const speciesId = employee.responsibleFor;
  return data
    .species
    .filter((specie) => speciesId.includes(specie.id))
    .map((specie) => specie.name);
};

const getLocationsOfAnimals = (animals) => data
  .species
  .filter((specie) => animals.includes(specie.name))
  .map((specie) => specie.location);

const getResumeOfEmployee = (idOrName) => {
  const employee = getEmployee(idOrName);
  return {
    id: employee.id,
    fullName: `${employee.firstName} ${employee.lastName}`,
    species: getSpeciesForEmployee(employee),
    locations: getLocationsOfAnimals(getSpeciesForEmployee(employee)),
  };
};

const getAllEmployees = () => data
  .employees
  .map((employee) => getResumeOfEmployee(employee));

const getEmployeesCoverage = (idOrName) => {
  if (typeof idOrName === 'object') {
    return getResumeOfEmployee(idOrName);
  }
  return getAllEmployees();
};

module.exports = getEmployeesCoverage;
