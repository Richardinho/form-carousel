describe('happy path', () => {
  it('passes', () => {
    cy.visit('/');

    cy.get('[data-cy=input-firstName]').type('{selectAll}John');

    cy.get('[data-cy=input-lastName]').type('{selectAll}Smith');

    cy.get('[data-cy=select-job]').select('artist');

    cy.get('[data-cy=next-button-personal]').click();

    cy.get('[data-cy=select-color]').select('blue');

    cy.get('[data-cy=next-button-color]').click();

    cy.get('[data-cy=radio-exercise-yes] input').check();

    cy.get('[data-cy=next-button-fitness]').click();

    cy.get('[data-cy=radio-pushups-yes] input').check();

    cy.get('[data-cy=submit-button]').click();

    cy.get('[data-cy=step-header-personal]').contains('Personal');

    cy.get('[data-cy=step-header-color]').contains('Your Preferences');

    cy.get('[data-cy=step-header-fitness]').contains('Fitness');

    cy.get('[data-cy=step-header-exercise]').contains('Exercises');

    cy.get('[data-cy=summary-item-firstName]').contains('John');

    cy.get('[data-cy=summary-item-lastName]').contains('Smith');

    cy.get('[data-cy=summary-item-job').contains('artist');

    cy.get('[data-cy=summary-item-color').contains('blue');

    cy.get('[data-cy=summary-item-exercise').contains('true');

    cy.get('[data-cy=summary-item-pushups').contains('true');
  });
});
