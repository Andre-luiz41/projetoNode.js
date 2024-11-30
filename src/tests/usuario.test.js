// src/tests/usuario.test.js

import request from 'supertest';
import app from '../server.js';  // Certifique-se de exportar o app no server.js

describe('GET /usuarios', () => {
  it('deve listar usuários com sucesso', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toEqual(200);  // Espera um status 200
    expect(res.body).toHaveProperty('usuarios');  // Espera que a resposta tenha o campo 'usuarios'
  });
});
