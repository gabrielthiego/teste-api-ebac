/// <reference types="cypress"/>

import contrato from '../contracts/produtos.contract'

describe('teste API - produtos', () => {
  let token;
  let produtoId;

  beforeEach(() => {
    cy.token('fulano@qa.com', 'teste').then(tkn => {
      token = tkn;
    });
  });

  it('Deve validar contrato de produtos com sucesso - CONTRATO', () => {
    cy.request('GET', 'produtos').then(response => {
      return contrato.validateAsync(response.body);
    });
  });

  it('Listar produtos - GET', () => {
    cy.request({
      method: 'GET',
      url: 'produtos'
    }).then((response) => {
      console.log('Resposta da API de produtos:', response);
      expect(response.body).to.have.property('produtos');
      expect(response.status).to.equal(200);
    });
  });

  it('Deve cadastrar um produto e editar com sucesso - PUT', () => {
    let produto = 'produto EBAC EDIÇÃO ' + Math.floor(Math.random() * 10000000);
    cy.cadastrarProduto(token, produto, 430, 'celular', 500)
      .then(response => {
        produtoId = response.body._id; // Armazena o ID do produto
        return cy.request({
          method: 'PUT',
          url: `produtos/${produtoId}`,
          headers: { authorization: token },
          body: {
            "nome": produto,
            "preco": 1358,
            "descricao": "celular",
            "quantidade": 1000,
          }
        });
      })
      .then((response) => {
        console.log('Resposta da API de produtos EDIÇÃO:', response);
        expect(response.body.message).to.equal('Registro alterado com sucesso');
        expect(response.status).to.equal(200);
      });
  });

  it('Deve deletar um produto com sucesso - DELETE', () => {
    cy.request({
      method: 'DELETE',
      url: `produtos/${produtoId}`,
      headers: { authorization: token }
    }).then((deleteResponse) => {
      console.log('Resposta da API de deleção de produto:', deleteResponse);
      expect(deleteResponse.body.message).to.equal('Registro excluído com sucesso');
      expect(deleteResponse.status).to.equal(200);
    });
  });
});
