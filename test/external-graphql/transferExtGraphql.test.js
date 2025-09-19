const request = require('supertest');
const { expect, use } = require('chai');
const chaiExclude = require('chai-exclude');
use(chaiExclude);

const host = 'http://localhost:4000';
var token;

describe('External transfer via HTTP', () => {
  describe('POST /transfer', () => {
        beforeEach(async () => {
        // 1) Caputar o token
        const login = await request(host)
            .post('/graphql')
            .send({
                query: `mutation Login($username: String!, $password: String!) { login(username: $username, password: $password) { token }}`,
                variables: { username: 'taina', password: '123456' }
            });
        
        token = login.body.data.login.token;
        });

        it('Teste via GraphQL: Quando uso dados válidos, o retorno será 200', async () => {
            const resposta = await request(host)
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `mutation Transfer($from: String!, $to: String!, $amount: Float!) {
                    transfer(from: $from, to: $to, amount: $amount) {
                        from
                        to
                        amount
                        date
                    }
                }`,
                variables: {from: "taina", to: "rafael", amount: 100}
            });

            const respostaEsperada = require('../fixture/responses/respostaTransferExternal201.json');
            expect(resposta.status).to.equal(200);
            expect(resposta.body.data.transfer).excluding('date').to.deep.equal(respostaEsperada);
        });
    });
});