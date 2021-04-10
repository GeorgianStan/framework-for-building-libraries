const URL = 'http://127.0.0.1:5501/demo/index.html';

describe('My First Test', () => {
  it('Should work as expected', () => {
    cy.visit(URL);

    cy.get('#is-prime').should('have.text', 'true');
    cy.get('#is-not-prime').should('have.text', 'false');
  });
});
