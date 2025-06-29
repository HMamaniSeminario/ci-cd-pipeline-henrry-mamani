const config = {
  development: {
    port: 3000,
    environment: 'development'
  },
  testing: {
    port: 3001,
    environment: 'testing'
  },
  production: {
    port: 80,
    environment: 'production'
  }
};

function getEnvironmentConfig(env) {
  return config[env] || config.development;
}

module.exports = getEnvironmentConfig;



