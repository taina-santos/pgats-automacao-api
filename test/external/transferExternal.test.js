const request = require('supertest');
const { expect } = require('chai');

const host = 'http://localhost:3000';

describe('External transfer via HTTP', () => {
  describe('POST /transfer', () => {
    //---------------------------------------------
    // TESTE VIA HTTP
    //---------------------------------------------
    it('Teste via http: Quando informo remetente e destinatário inexistente, o retorno será 400', async () => {
      // Para o uso do servidor rest, a gente modifica o request(app) para
      const resposta = await request(host)
        .post('/transfer')
        .send({
          from: "user1",
          to: "user2",
          amount: 100
        });
      
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')
    });
  });
});