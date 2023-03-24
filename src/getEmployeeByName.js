const data = require('../data/zoo_data');

const getEmployeeByName = (...employeeName) => {
  if (employeeName.length <= 0) {
    return {};
  }
  return data
    .employees
    .find((employee) => {
      if (
        employeeName.includes(employee.firstName)
        || employeeName.includes(employee.lastName)
      ) {
        return true;
      }
      return false;
    });
};

module.exports = getEmployeeByName;
