/// <reference types="cypress" />
 
import contrato from '../contracts/usuario.contrato'

describe('Testes da Funcionalidade Usuários', () => {

  it.only('Deve validar contrato de usuários', () => {
    it('Deve validar contrato de usuário com sucesso  - CONTRATO', () => {
      cy.request('produtos').then(response => {
        return contrato.validateAsync(response.body)
      })
    })
  });

  it('Deve listar usuários cadastrados', () => {
    //TODO: 
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    //TODO: 
  });

  it('Deve validar um usuário com email inválido', () => {
    //TODO: 
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    //TODO: 
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    //TODO: 
  });


});