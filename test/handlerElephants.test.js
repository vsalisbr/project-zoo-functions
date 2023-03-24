const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  const elephants = {
    id: 'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5',
    name: 'elephants',
    popularity: 5,
    location: 'NW',
    availability: ['Friday', 'Saturday', 'Sunday', 'Tuesday'],
    residents: [
      {
        name: 'Ilana',
        sex: 'female',
        age: 11,
      },
      {
        name: 'Orval',
        sex: 'male',
        age: 15,
      },
      {
        name: 'Bea',
        sex: 'female',
        age: 12,
      },
      {
        name: 'Jefferson',
        sex: 'male',
        age: 4,
      },
    ],
  };

  it('Ao executar sem entrada, o retorno deve ser "undefined"', () => {
    expect(handlerElephants()).toBeUndefined();
  });
  it('Ao executar com entrada diferente de string deverá retornar mensagem "Parâmetro inválido, é necessário uma string"', () => {
    const messageError = 'Parâmetro inválido, é necessário uma string';
    expect(handlerElephants(1)).toBe(messageError);
    expect(handlerElephants(['Teste'])).toBe(messageError);
    expect(handlerElephants([])).toBe(messageError);
    expect(handlerElephants({ teste: 'teste' })).toBe(messageError);
    expect(handlerElephants({})).toBe(messageError);
  });
  it('Ao executar com entrada de um parâmetro, o retorno é do valor deste parâmetro', () => {
    expect(handlerElephants('id')).toBe(elephants.id);
    expect(handlerElephants('name')).toBe(elephants.name);
    expect(handlerElephants('popularity')).toBe(elephants.popularity);
    expect(handlerElephants('location')).toBe(elephants.location);
    expect(handlerElephants('availability')).toEqual(elephants.availability);
    expect(handlerElephants('residents')).toEqual(elephants.residents);
  });
  it('Ao executar com entrada "count", deve retornar a quantidade de elefantes', () => {
    expect(handlerElephants('count')).toBe(4);
    expect(handlerElephants('count')).not.toBe('4');
  });
  it('Ao executar com entrada "names", deve retornar o nome dos elefantes', () => {
    const elephantsName = ['Ilana', 'Orval', 'Bea', 'Jefferson'];
    expect(handlerElephants('names')).toEqual(elephantsName);
  });
  it('Ao executar com entrada "averageAge", deve retornar a idade média dos elefantes', () => {
    expect(handlerElephants('averageAge')).toBeCloseTo(10.5);
  });
  it('Ao executar com entrada de string não prevista, deve retornar "null"', () => {
    expect(handlerElephants('teste')).toBeNull();
    expect(handlerElephants('teste1')).toBeNull();
    expect(handlerElephants('teste Teste')).toBeNull();
  });
});
