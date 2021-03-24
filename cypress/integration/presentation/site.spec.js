/// <reference types="cypress" />

const divices = ['macbook-15', 'iphone-xr'];

divices.forEach((device) => {
  context(`Visit app on ${device}`, () => {
    beforeEach(() => {
      cy.viewport(device);
      cy.visit('/');
    });

    context('[ENTRY]', () => {
      it('Check welcome text', () => {
        cy.contains('Cypress Rocks');
      });
    });
  
    context('[NAVIGATION]', () => {  
      it('Try go to about page', () => {
        cy.get(':nth-child(2) > a').then((subject) => {
          cy.get(subject).click();
        });
        cy.wait(1000);
        cy.url().should('contain', 'about');
        cy.contains('Cypress');
      });

      it('Try go to blog', () => {
        cy.get(':nth-child(3) > a').then((subject) => {
          cy.get(subject).click();
        });
        cy.wait(1000);
        cy.url().should('contain', 'blog');
      });
    });

    context('[BLOG]', () => {
      beforeEach(() => {
        cy.intercept('blog.json', {
          fixture: 'blog.json',
        });
        // cy.intercept('blog.json', {});
        cy.visit('/blog');
      });

      it('Check if has recent posts about cypress', () => {
        cy.contains('Recent posts');
        cy.contains('What is Cypress?');
      });
    });
  });
});
