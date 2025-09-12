// Fazendo as chamadas das bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Chamadas da aplicação em si
const app = require('../../app');

// TESTES

// Teste sem o simulador
// Describe é um grupo de testes, e vou botar o nome do que estou testando
describe('Transfer controller', () => {
  describe('POST /transfer', () => {
    it.skip('Quando uso dados válidos, o retorno será 201', async () => {
      const resposta = await request(app)
        .post('/transfer')
        .send({
          from: "user1",
          to: "user2",
          amount: 100
        });
    });

    it('Quando informo remetente e destinatário inexistente, o retorno será 400', async () => {
      const resposta = await request(app)
        .post('/transfer')
        .send({
          from: "user1",
          to: "user2",
          amount: 100
        });
      
      expect(resposta.status).to.equal(400);
    });
  });

  describe('GET /transfer', () => {
    // os IT ficam aqui
  });
});