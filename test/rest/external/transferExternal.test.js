const request = require('supertest');
const { expect, use } = require('chai');
const chaiExclude = require('chai-exclude');
use(chaiExclude);

const host = 'http://localhost:3000';
var token;

describe('External transfer via HTTP', () => {
  describe('POST /transfer', () => {
    beforeEach(async () => {
      // 1) Caputar o token
      const login = await request(host)
        .post('/users/login')
        .send({
          username: 'taina',
          password: '123456'
        });
      
      token = login.body.token;
    });

    //---------------------------------------------
    // TESTE VIA HTTP
    //---------------------------------------------
    it('Teste via http: Quando informo remetente e destinatário inexistente, o retorno será 400', async () => {
      // 2) Realizar a transferência
      // Para o uso do servidor rest, a gente modifica o request(app) para
      const resposta = await request(host)
        .post('/transfer')
        .set('Authorization', `Bearer ${token}`)
        //.auth(login.body.token, {type: "bearer"})
        .send({
          from: "taina",
          to: "nonExistentUser",
          amount: 100
        });
      
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')
    });

    it('Teste via http: Quando uso dados válidos, o retorno será 201', async () => {
      const resposta = await request(host)
        .post('/transfer')
        .set('Authorization', `Bearer ${token}`)
        .send({
          from: "taina",
          to: "rafael",
          amount: 100
        });

      const respostaEsperada = require('../fixture/responses/respostaTransferExternalSucesso.json');
      expect(resposta.status).to.equal(201);
      expect(resposta.body).excluding('date').to.deep.equal(respostaEsperada);
    });
  });
});