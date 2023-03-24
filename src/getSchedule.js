const data = require('../data/zoo_data');

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const isAnimal = (scheduleTarget) => data
  .species
  .some((elemento) => elemento.name === scheduleTarget);

const isDay = (scheduleTarget) => daysOfWeek.indexOf(scheduleTarget) !== -1;

const zooOpenInDay = (day) => {
  const { open, close } = data.hours[day];
  return open > 0 && close > 0;
};

const officeHour = (day) => {
  const { open, close } = data.hours[day];
  if (zooOpenInDay(day)) {
    return `Open from ${open}am until ${close}pm`;
  }
  return 'CLOSED';
};

const getAnimalsOfDay = (day) => {
  const animals = data
    .species
    .filter((specie) => specie.availability.includes(day))
    .map((specie) => specie.name);
  if (animals.length > 0) {
    return animals;
  }
  return 'The zoo will be closed!';
};

const schedule = () => {
  const output = {};
  daysOfWeek.forEach((day) => {
    output[day] = {
      officeHour: officeHour(day),
      exhibition: getAnimalsOfDay(day),
    };
  });
  return output;
};

const getScheduleOfAnimal = (animal) => data
  .species
  .find((specie) => specie.name === animal)
  .availability;

const getScheduleOfDay = (day) => {
  const output = {
    [day]: {
      officeHour: officeHour(day),
      exhibition: getAnimalsOfDay(day),
    },
  };
  return output;
};

const getSchedule = (scheduleTarget) => {
  if (isAnimal(scheduleTarget)) {
    return getScheduleOfAnimal(scheduleTarget);
  }
  if (isDay(scheduleTarget)) {
    return getScheduleOfDay(scheduleTarget);
  }
  return schedule();
};

module.exports = getSchedule;
