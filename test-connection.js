require('dotenv').config();
// test-connection.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }, // Habilita SSL para conexiones seguras (importante en Render)
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.'
    );
    // Realiza consultas o pruebas adicionales aquí
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    sequelize.close(); // Cierra la conexión al finalizar
  }
}

testConnection();
