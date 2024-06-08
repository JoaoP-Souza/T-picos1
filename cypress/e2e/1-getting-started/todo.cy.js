describe('casos de teste cadastrados', () => {
  //cria funcao que crria string aleatoria de 6 caracteres
  function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  } 
beforeEach(() => {
cy.visit('http://localhost:4200/')
})

it('tentar logar no sistema com dados inválidos e verificar o erro', () => { 
cy.get('[type="text"]').clear().type('invalido');
cy.get('[type="password"]').clear().type('invalido');
cy.get('.login-button').click();
cy.on('window:alert', (str) => {
expect(str).to.equal('Credenciais inválidas');
});
})

it('tentar cadastrar um usuario com dados invalidos', () => { 
cy.contains('Cadastrar').click();
cy.get('[placeholder="Username"]').clear().type('invalido');
cy.get('[placeholder="Email"]').clear().type('invalido');
cy.get('[placeholder="Password"]').clear().type('invalido');
cy.get('[placeholder="Repeat Password"]').clear().type('invalido');
cy.on('window:alert', (str) => {
expect(str).to.equal('insira dados válidos');
});
})

it('tentar cadastrar um usuario com senhas que nao sejam iguais', () => {


var credencial = makeid(6);

cy.contains('Cadastrar').click();
cy.get('[placeholder="Username"]').clear().type(credencial);
cy.get('[placeholder="Email"]').clear().type(credencial + '@' + credencial);
cy.get('[placeholder="Password"]').clear().type(credencial);
cy.get('[placeholder="Repeat Password"]').clear().type(credencial + '1');
cy.on('window:alert', (str) => {
  expect(str).to.equal('Senhas devem ser iguais');
});
})     
it('Deve cadastrar usuario e acessar o chat com os dados cadastrados', () => { 
var credencial = makeid(6);

cy.contains('Cadastrar').click();
cy.get('[placeholder="Username"]').clear().type(credencial);
cy.get('[placeholder="Email"]').clear().type(credencial + '@' + credencial);
cy.get('[placeholder="Password"]').clear().type(credencial);
cy.get('[placeholder="Repeat Password"]').clear().type(credencial);
cy.get('button').contains('Cadastrar').click();
cy.visit('http://localhost:4200/login');
cy.get('[type="text"]').clear().type(credencial + '@' + credencial);
cy.get('[type="password"]').clear().type(credencial);
cy.get('.login-button').click();
cy.contains('Bem vindo ao atendimento automático da IWS!').should('exist');

})

it('Deve acessar o chat sem cadastro', () => { 
cy.scrollTo('bottom');
cy.contains('Iniciar atendimento direto').click();
cy.contains('Bem vindo ao atendimento automático da IWS!').should('exist');
})


})
