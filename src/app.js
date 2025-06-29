const express = require('express');
const getEnvironmentConfig = require('./config');

const app = express();
app.use(express.json());

const env = process.env.NODE_ENV || 'development';
const currentConfig = getEnvironmentConfig(env);
const PORT = currentConfig.port;

function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Ambos argumentos deben ser números para la suma.');
  }
  return a + b;
}

function subtract(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Ambos argumentos deben ser números para la resta.');
  }
  return a - b;
}

function divide(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Ambos argumentos deben ser números para la división.');
  }
  if (b === 0) {
    throw new Error('No se puede dividir por cero.');
  }
  return a / b;
}

app.get('/', (req, res) => {
  res.status(200).json({ message: `Bienvenido a la aplicación CI/CD en entorno ${currentConfig.environment}!` });
});

app.post('/add', (req, res, next) => {
  try {
    const { num1, num2 } = req.body;
    const result = add(num1, num2);
    res.status(200).json({ operation: 'add', num1, num2, result });
  } catch (error) {
    next(error);
  }
});

app.post('/subtract', (req, res, next) => {
  try {
    const { num1, num2 } = req.body;
    const result = subtract(num1, num2);
    res.status(200).json({ operation: 'subtract', num1, num2, result });
  } catch (error) {
    next(error);
  }
});

app.post('/divide', (req, res, next) => {
  try {
    const { num1, num2 } = req.body;
    const result = divide(num1, num2);
    res.status(200).json({ operation: 'divide', num1, num2, result });
  } catch (error) {
    next(error);
  }
});

app.get('/nonexistent', (req, res, next) => {
  const error = new Error('Ruta no encontrada');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  res.status(status).json({
    error: {
      message: message,
      code: status
    }
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT} en entorno ${currentConfig.environment}`);
  });
}

module.exports = { app, add, subtract, divide };