const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {
  const hours = {
    Tuesday: { open: 8, close: 6 },
    Wednesday: { open: 8, close: 6 },
    Thursday: { open: 10, close: 8 },
    Friday: { open: 10, close: 8 },
    Saturday: { open: 8, close: 10 },
    Sunday: { open: 8, close: 8 },
    Monday: { open: 0, close: 0 },
  };

  const zooCLosed = 'The zoo is closed';
  const zooOpen = 'The zoo is open';
  const errorHour = 'The hour must be between 0 and 12';
  const errorMinute = 'The minutes must be between 0 and 59';
  const errorAbbreviation = 'The abbreviation must be \'AM\' or \'PM\'';
  const errorDay = 'The day must be valid. Example: Monday';

  it('Ao executar sem entradas, deve retornar o objeto "hours"', () => {
    expect(getOpeningHours()).toEqual(hours);
  });

  it('Ao executar com entrada de hora inválida, deve retornar o erro "The hour must be between 0 and 12"', () => {
    expect(() => { getOpeningHours('Monday', '14:01-AM'); }).toThrow(errorHour);
    expect(() => { getOpeningHours('Monday', '99:01-AM'); }).toThrow(errorHour);
  });

  it('Ao executar com entrada de minuto inválido, deve retornar o erro "The minutes must be between 0 and 59"', () => {
    expect(() => { getOpeningHours('Monday', '05:60-AM'); }).toThrow(errorMinute);
    expect(() => { getOpeningHours('Monday', '12:90-AM'); }).toThrow(errorMinute);
  });

  it('Ao executar com entrada de parte do dia (AM, PM) incorreta , deve retornar o erro "The abbreviation must be \'AM\' or \'PM\'"', () => {
    expect(() => { getOpeningHours('Monday', '05:04-aam'); }).toThrow(errorAbbreviation);
    expect(() => { getOpeningHours('Monday', '05:04-AA'); }).toThrow(errorAbbreviation);
    expect(() => { getOpeningHours('Monday', '05:04-23'); }).toThrow(errorAbbreviation);
  });

  it('Ao executar com entrada "Monday", representando um dia onde o zoo está fechado, o retorno deve ser sempre "The zoo is closed"', () => {
    expect(getOpeningHours('Monday', '04:01-AM')).toBe(zooCLosed);
    expect(getOpeningHours('Monday', '04:01-PM')).toBe(zooCLosed);
    expect(getOpeningHours('Monday', '12:01-PM')).toBe(zooCLosed);
    expect(getOpeningHours('Monday', '12:00-AM')).toBe(zooCLosed);
    expect(getOpeningHours('Monday', '00:00-PM')).toBe(zooCLosed);
  });
  it('Ao executar com entrada "Sunday", em um horário que o Zoo está fechado, o retorno deverá ser "The zoo is closed"', () => {
    expect(getOpeningHours('Sunday', '04:01-AM')).toBe(zooCLosed);
    expect(getOpeningHours('Sunday', '12:00-AM')).toBe(zooCLosed);
    expect(getOpeningHours('Sunday', '08:01-PM')).toBe(zooCLosed);
  });

  it('Ao executar com entrada "Sunday", em um horário que o Zoo está aberto, o retorno deverá ser "The zoo is open"', () => {
    expect(getOpeningHours('Sunday', '04:01-PM')).toBe(zooOpen);
    expect(getOpeningHours('Sunday', '12:00-PM')).toBe(zooOpen);
    expect(getOpeningHours('Sunday', '08:01-AM')).toBe(zooOpen);
  });

  it('Ao executar com entrada maiúscula ou minúscula para o dia, deve receber o retorno esperado', () => {
    expect(getOpeningHours('Monday', '04:01-AM')).toBe(zooCLosed);
    expect(getOpeningHours('monday', '04:01-PM')).toBe(zooCLosed);
    expect(getOpeningHours('MONDAY', '00:00-AM')).toBe(zooCLosed);
    expect(getOpeningHours('mOnDaY', '00:00-PM')).toBe(zooCLosed);
  });

  it('Ao executar entrada de um dia inválido deve retornar o erro "The day must be valid. Example: Monday"', () => {
    expect(() => { getOpeningHours('Mondays', '05:04-AM'); }).toThrow(errorDay);
  });

  it('Ao executar entrada de uma string no lugar da hora ou minuto deve retornar um erro', () => {
    expect(() => { getOpeningHours('Monday', '0A:04-AM'); }).toThrow();
    expect(() => { getOpeningHours('Monday', '02:aa-AM'); }).toThrow();
    expect(() => { getOpeningHours('Monday', 'AA:AA-AM'); }).toThrow();
  });
});
