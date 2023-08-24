describe('validation', () => {
  it('passes', () => {
    cy.visit('/');

    cy.get('[data-cy=select-job]').select('artist');

    cy.get('[data-cy=input-firstName]').type('{selectAll}{backspace}');

    cy.get('[data-cy=input-lastName]').focus();

    cy.get('[data-cy=error-message-firstName]').contains(
      'you must include your first name'
    );

    cy.get('[data-cy=next-button-personal]').should('be.disabled');

    cy.get('[data-cy=input-firstName]').type('a');

    cy.get('[data-cy=next-button-personal]').should('not.be.disabled');
  });
});
