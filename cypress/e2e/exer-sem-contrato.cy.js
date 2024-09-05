/// <reference types="cypress" />

describe('Testes de Usuários - Serverest', () => {
    let usuarioId;
  
    
    const gerarUsuarioAleatorio = () => ({
      nome: 'Usuário ' + Math.floor(Math.random() * 10000000),
      email: `usuario${Math.floor(Math.random() * 10000000)}@qa.com`,
      password: 'senha123',
      administrador: "true" 
    });
  
    it('Listar usuários  - GET', () => {
      cy.request({
        method: 'GET',
        url: 'usuarios'
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.usuarios).to.be.an('array');
      });
    });
  
    it('Cadastrar usuário - POST', () => {
      const usuario = gerarUsuarioAleatorio();
  
      cy.request({
        method: 'POST',
        url: 'usuarios',
        body: usuario
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Cadastro realizado com sucesso');
        usuarioId = response.body._id; 
      });
    });
  
    it('Validar e-mail - ERRO', () => {
      cy.request({
        method: 'POST',
        url: 'usuarios',
        body: {
          nome: 'Usuário com Email Errado',
          email: 'email_invalido',
          password: 'senha123',
          administrador: "true" 
        },
        failOnStatusCode: false 
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.email).to.equal('email deve ser um email válido');
      });
    });
  
    it('Editar usuário - PUT', function() {
      const usuarioEditado = {
        nome: 'Usuário Editado',
        email: 'usuarioeditado@qa.com',
        password: 'senha123',
        administrador: "true" 
      };
  
      if (usuarioId) {
        cy.request({
          method: 'PUT',
          url: `usuarios/${usuarioId}`,
          body: usuarioEditado
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('Registro alterado com sucesso');
        });
      } else {
        throw new Error('ID do usuário não foi definido');
      }
    });
  
    it('Deletar usuário - DELETE', function() {
    
      if (usuarioId) {
        cy.request({
          method: 'DELETE',
          url: `usuarios/${usuarioId}`
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('Registro excluído com sucesso');
        });
      } else {
        throw new Error('ID do usuário não foi definido');
      }
    });
  });
  