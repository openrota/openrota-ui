/// <reference types="cypress" />

describe('Smoke Test', () => {
  it('should render', () => {
    cy.visit('https://prod.foo.redhat.com:1337');
  });
});
