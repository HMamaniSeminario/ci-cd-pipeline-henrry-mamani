const request = require('supertest');
const { app } = require('../src/app');

let server;

beforeAll((done) => {
  server = app.listen(3002, () => {
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    done();
  });
});

describe('Tests de Integración de la Aplicación', () => {
  test('GET / debe retornar un mensaje de bienvenida', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Bienvenido a la aplicación CI/CD');
  });

  test('POST /add debe sumar dos números y retornar el resultado', async () => {
    const res = await request(app)
      .post('/add')
      .send({ num1: 10, num2: 5 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ operation: 'add', num1: 10, num2: 5, result: 15 });
  });

  test('POST /subtract debe restar dos números y retornar el resultado', async () => {
    const res = await request(app)
      .post('/subtract')
      .send({ num1: 10, num2: 5 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ operation: 'subtract', num1: 10, num2: 5, result: 5 });
  });

  test('POST /divide debe dividir dos números y retornar el resultado', async () => {
    const res = await request(app)
      .post('/divide')
      .send({ num1: 10, num2: 2 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ operation: 'divide', num1: 10, num2: 2, result: 5 });
  });

  test('POST /divide debe retornar error 400 si se intenta dividir por cero', async () => {
    const res = await request(app)
      .post('/divide')
      .send({ num1: 10, num2: 0 });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error.message).toEqual('No se puede dividir por cero.');
    expect(res.body.error.code).toEqual(500);
  });

  test('POST /add debe retornar error 400 si los argumentos no son números', async () => {
    const res = await request(app)
      .post('/add')
      .send({ num1: 'abc', num2: 5 });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error.message).toEqual('Ambos argumentos deben ser números para la suma.');
    expect(res.body.error.code).toEqual(500);
  });

  test('GET a ruta inexistente debe retornar error 404', async () => {
    const res = await request(app).get('/this-route-does-not-exist');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error.message).toEqual('Ruta no encontrada');
    expect(res.body.error.code).toEqual(404);
  });

  test('GET /nonexistent debe retornar error 404', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error.message).toEqual('Ruta no encontrada');
    expect(res.body.error.code).toEqual(404);
  });
});
