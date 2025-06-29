const { add, subtract, divide } = require('../src/app');

describe('Funciones de Cálculo', () => {
  test('debe sumar dos números correctamente', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });

  test('debe restar dos números correctamente', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(3, 5)).toBe(-2);
    expect(subtract(0, 0)).toBe(0);
  });

  test('debe dividir dos números correctamente', () => {
    expect(divide(10, 2)).toBe(5);
    expect(divide(7, 2)).toBe(3.5);
    expect(divide(0, 5)).toBe(0);
  });

  test('debe lanzar un error cuando se divide por cero', () => {
    expect(() => divide(10, 0)).toThrow('No se puede dividir por cero.');
  });

  test('add debe lanzar un error si los argumentos no son números', () => {
    expect(() => add('a', 2)).toThrow('Ambos argumentos deben ser números para la suma.');
    expect(() => add(1, 'b')).toThrow('Ambos argumentos deben ser números para la suma.');
    expect(() => add(null, 2)).toThrow('Ambos argumentos deben ser números para la suma.');
  });

  test('subtract debe lanzar un error si los argumentos no son números', () => {
    expect(() => subtract('a', 2)).toThrow('Ambos argumentos deben ser números para la resta.');
  });

  test('divide debe lanzar un error si los argumentos no son números', () => {
    expect(() => divide('a', 2)).toThrow('Ambos argumentos deben ser números para la división.');
  });
});
