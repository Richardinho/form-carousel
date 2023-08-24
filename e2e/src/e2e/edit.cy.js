describe('edit', () => {
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

    cy.get('[data-cy=summary-item-pushups').contains('true');

    //  click edit on fitness step
    cy.get('[data-cy=edit-fitness]').click();

    //  select exercise is false
    cy.get('[data-cy=radio-exercise-no] input').check();

    cy.get('[data-cy=next-button-fitness]').click();

    //  select tv programme is different strokes
    cy.get('[data-cy=select-tv-programme]').select('Different Strokes');
    //  click submit button

    cy.get('[data-cy=submit-button]').click();

    //  verify that exercise step is not on page
    cy.get('[data-cy=step-header-exercise]').should('not.exist');

    //  verify that tv programme is different strokes
    cy.get('[data-cy=summary-item-tv-programme]').contains('Different Strokes');
  });
});
