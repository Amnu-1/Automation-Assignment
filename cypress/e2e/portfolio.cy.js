describe('Portfolio Website Tests', () => {

  it('TC01 - Homepage Loads', () => {
    cy.visit('http://127.0.0.1:5500/Portfolio/index.html');
    cy.title().should('contain', 'Aman Kumar');
  });

  it('TC02 - Navigation Menu', () => {
    cy.visit('http://127.0.0.1:5500/Portfolio/index.html');

    cy.contains('Home').should('be.visible');
    cy.contains('About').should('be.visible');
    cy.contains('Skills').should('be.visible');
    cy.contains('Projects').should('be.visible');
    cy.contains('Contact').should('be.visible');
  });

  it('TC03 - Skills Section', () => {
    cy.visit('http://127.0.0.1:5500/Portfolio/index.html');
    cy.get('#skills').should('be.visible');
  });

  it('TC04 - Projects Section', () => {
    cy.visit('http://127.0.0.1:5500/Portfolio/index.html');
    cy.get('#projects').should('be.visible');
  });

  it('TC05 - Contact Form', () => {
    cy.visit('http://127.0.0.1:5500/Portfolio/index.html');

    cy.get('input[name="name"]').type('Aman');
    cy.get('input[name="email"]').type('aman@test.com');
    cy.get('textarea').type('Testing using Cypress');
  });

});