const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb');  // Remova as opções obsoletas

mongoose.connection.on('connected', () => {
  console.log('Banco de dados conectado!');
});

mongoose.connection.on('error', (err) => {
  console.log('Erro de conexão:', err);
});
