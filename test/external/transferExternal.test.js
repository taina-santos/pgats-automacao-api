const request = require('supertest');
const { expect } = require('chai');

const host = 'http://localhost:3000';

describe('External transfer via HTTP', () => {
  describe('POST /transfer', () => {
    //---------------------------------------------
    // TESTE VIA HTTP
    //---------------------------------------------
    it('Teste via http: Quando informo remetente e destinatário inexistente, o retorno será 400', async () => {
      // 1) Caputar o token
      const login = await request(host)
        .post('/users/login')
        .send({
          username: 'taina',
          password: '123456'
        });

      // 2) Realizar a transferência
      // Para o uso do servidor rest, a gente modifica o request(app) para
      const resposta = await request(host)
        .post('/transfer')
        .set('Authorization', `Bearer ${login.body.token}`)
        //.auth(login.body.token, {type: "bearer"})
        .send({
          from: "taina",
          to: "nonExistentUser",
          amount: 100
        });
      
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')
    });
  });
});