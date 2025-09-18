// Fazendo as chamadas das bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect, use } = require('chai');

// Declarando o plugin do chai exclude para excluir os valores dinâmicos
const chaiExclude = require('chai-exclude');

use(chaiExclude);

// Criando o mock de autenticação antes da chamada do app em si, pois assim não será necessário o uso do token nos testes de controller
const auth = require('../../middleware/auth');
sinon.stub(auth, 'authenticateToken').callsFake((_req, _res, next) => next());

// Chamadas da aplicação em si
const app = require('../../app');

// Mock
const transferService = require('../../service/transferService');

// TESTES

// Teste sem o simulador
// Describe é um grupo de testes, e vou botar o nome do que estou testando
describe('Transfer controller', () => {
  // Criando after para restaurar o stub do token de autenticação
  after(() => {
    sinon.restore();
  });

  describe('POST /transfer', () => {
    //---------------------------------------------
    // TESTE SEM MOCK, CHAMANDO DIRETAMENTE O APP
    //---------------------------------------------
    it('Quando informo remetente e destinatário inexistente, o retorno será 400', async () => {
      const resposta = await request(app)
        .post('/transfer')
        .send({
          from: "user1",
          to: "user2",
          amount: 100
        });
      
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')
    });

    //---------------------------------------------
    // TESTE COM MOCK
    //---------------------------------------------
    // Dentro do módulo de controller, nós usamos mock nos testes
    it('Usando mocks: quando informo remetente e destinatário inexistente, o retorno será 400', async () => {
      // Preciso saber quais as funções que são chamadas no controller específico que quero testar, nesse caso o post /transfer
      // Mockar apenas a função transfer do service
      const transferServiceMock = sinon.stub(transferService, 'transfer');
      transferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado'));

      const resposta = await request(app)
        .post('/transfer')
        .send({
          from: "user1",
          to: "user2",
          amount: 100
        });
      
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')

      // Resetar o mock de transferService
      transferServiceMock.restore();
    });

    it('Usando mocks: quando uso dados válidos, o retorno será 201', async () => {
      const transferServiceMock = sinon.stub(transferService, 'transfer');
      transferServiceMock.returns({
        from: "user1",
        to: "user2",
        amount: 100,
        date: new Date().toISOString()
      });

      const resposta = await request(app)
        .post('/transfer')
        .send({
          from: "user1",
          to: "user2",
          amount: 100
        });
      
      expect(resposta.status).to.equal(201);
      // expect(resposta.body).to.have.property('from', 'user1');
      // expect(resposta.body).to.have.property('to', 'user2');
      // expect(resposta.body).to.have.property('amount', 100);

      // Validação com fixute
      // Prepara todos os dados, carrega o arquivo e prepara a forma de ignorar os campos dinâmicos
      const respostaEsperada = require('../fixture/responses/respostaTransferController201.json');
      // delete resposta.body.date;
      // delete respostaEsperada.date;

      // Para validar cada campo do resposta body, fazemos um único expect para comparar a resposta.body com a string contida no arquivo
      // O 'to deep equal' é um método de comparação recursivo, ou seja, não importa a ordem do json
      // Já o apenas 'to equal' compara o valor E a referência, e como foram criados de maneira diferente, o teste retornaria um erro
      // O 'to eql' === 'to deep equal'

      // expect(resposta.body).to.deep.equal(respostaEsperada);
      expect(resposta.body).excluding('date').to.deep.equal(respostaEsperada);

      // Resetar o mock de transferService
      transferServiceMock.restore();
    });
  });

  describe('GET /transfer', () => {
    // os IT ficam aqui
  });
});