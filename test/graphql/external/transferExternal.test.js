const request = require('supertest');
const { expect, use } = require('chai');
const chaiExclude = require('chai-exclude');
use(chaiExclude);

const host = 'http://localhost:4000/graphql';
var token;

describe('External transfer via GraphQL', () => {
    before(async () => {
        const loginUser = require('../fixture/requests/login/loginUser.json');
        const login = await request(host)
            .post('')
            .send(loginUser);
        
        token = login.body.data.login.token;
    });
        
    describe('POST /transfer', () => {
        it('Teste via GraphQL: Quando uso dados válidos, o retorno será 200', async () => {
            const transferSucesso = require('../fixture/requests/transfer/transfer.json');
            const resposta = await request(host)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(transferSucesso);

            const respostaEsperada = require('../fixture/responses/respostaTransferExternalSucesso.json');
            expect(resposta.status).to.equal(200);
            expect(resposta.body.data.transfer).excluding('date').to.deep.equal(respostaEsperada);
        });

        it('Teste via GraphQL: Quando tento transferir mais do que o valor em conta, o retorno será 200 com a mensagem de erro de Saldo Insuficiente', async () => {
            const transferSaldoInsuficiente = require('../fixture/requests/transfer/transfer.json');
            transferSaldoInsuficiente.variables.amount = 11000
            const resposta = await request(host)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(transferSaldoInsuficiente);

            const respostaEsperada = require('../fixture/responses/respostaTransferExternalSaldoInsuficiente.json');
            expect(resposta.status).to.equal(200);
            expect(resposta.body.errors[0]).to.include(respostaEsperada);
        });
    });
});